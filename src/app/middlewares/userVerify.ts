import catchAsync from '../utils/catchAsync';

export const userVerify = catchAsync(async (...roles) => (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (!roles?.includes(userRole)) {
      return res.json({
        success: false,
        message: 'You are not authorized',
      });
    }

    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
    });
  }
});
