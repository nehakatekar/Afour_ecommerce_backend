const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
exports.createProduct =catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});
exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments()
  const apiFeature = new ApiFeatures(Product.find(), req.query)
  .search().filter().pagination(resultPerPage)
  const products = await apiFeature.query;
  res.status(201).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
})
// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
  //update-Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    })
    res.status(200).json({
      success: true,
      product
    })
  })
// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404))
    }
    res.status(200).json({
      success: true,
      product,
    });
  });
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404))
    }
    await product.remove()
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });