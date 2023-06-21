const Expense = require("../models/expense");
const AWS = require("aws-sdk");
const DownloadFile = require("../models/downloadfile");

function isStringInValid(string) {
  if (string === undefined || string === null || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.postAddExpense = async (req, res, next) => {
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const date = req.body.date;
    const month = req.body.month;
    const year = req.body.year;
    if (
      isStringInValid(description) ||
      isStringInValid(category) ||
      amount == undefined ||
      amount === null ||
      amount < 0
    ) {
      return res.status(400).json({ err: "Bad parameters" });
    }

    const expense = new Expense({
      amount: amount,
      description: description,
      category: category,
      date: date,
      month: month,
      year: year,
      userId: req.user,
    });
    await expense.save();

    req.user.totalexpense = req.user.totalexpense + Number.parseInt(amount);
    await req.user.save();

    return res.status(201).json(expense);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: err, success: false });
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    console.log(">>>>>", page);
    let size = parseInt(req.query.size);
    console.log(">>>>>", size);
    const total = await Expense.count({ userId: req.user._id });
    console.log("TOtal>>>>>", total);
    
    let offset = total - page * size;
    console.log("offset", offset);
    let limit = size;
    if (offset < 0) {
      offset = 0;
      limit = total - (page - 1) * size;
    }
    console.log("new offset", offset);
    const expenses = await Expense.find({ userId: req.user._id })
      .limit(limit)
      .skip(offset);
    console.log("Expense", expenses);

    return res.status(200).json({ expenses, total, page, size });
  } catch (err) {
    return res.status(500).json({ error: err, success: false });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.expenseId;

    if (expenseId == undefined || expenseId.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Bad parameters" });
    }
    const expense = await Expense.findByIdAndRemove(expenseId);
    console.log("EXpense>>>>", expense);

    req.user.totalexpense = req.user.totalexpense - expense.amount;
    await req.user.save();

    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err, success: false });
  }
};

const uploadToS3 = (data, filename) => {
  const BUCKET_NAME = process.env.AWS_IAM_BUCKET_NAME;
  const IAM_USER_KEY = process.env.AWS_IAM_ACCESS_KEY;
  const IAM_USER_SECRET = process.env.AWS_IAM_SECRET_KEY;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log("Something went wrong", err);
        reject("Something went wrong");
      } else {
        console.log("success", s3response);
        console.log(s3response.Location);
        resolve(s3response.Location);
      }
    });
  });
};

exports.getDownloadExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    console.log(expenses);

    const userId = req.user._id;
    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `Expense${userId}/${new Date()}.txt`;

    const fileURL = await uploadToS3(stringifiedExpenses, filename);
    console.log(">>>>>>>", fileURL);

    const file = new DownloadFile({
      fileURL: fileURL,
      userId: req.user,
      date: new Date(),
    });
    await file.save();

    res.status(200).json({ file: fileURL, message: "done", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ file: "", success: false, error: err });
  }
};

exports.getDownloadHistory = async (req, res, next) => {
  const downloadHistory = await DownloadFile.find({ userId: req.user._id });
  res.status(200).json(downloadHistory);
};

exports.editExpense = async (req, res, next) => {
  try {
    const id = req.params.expenseId;
    const amount = req.body.amount;
    const expenses = await req.user.getExpenses({ where: { id: id } });

    console.log(req.body.amount);
    const expense = expenses[0];
    await expense.update({
      amount: amount,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      month: req.body.month,
      year: req.body.year,
    });

    console.log(">>>>>>updated", expense);

    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
