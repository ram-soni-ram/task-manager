class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(res, data, message = "Operation successful", code = 200) {
    return res.status(code).json(new ApiResponse(code, data, message));
  }

  static created(res, data, message = "Resource created successfully") {
    return res.status(201).json(new ApiResponse(201, data, message));
  }

  static paginated(res, data, page, limit, total, message = "Data retrieved") {
    const paginatedData = {
      results: data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore: page * limit < total,
      },
    };
    return res.status(200).json(new ApiResponse(200, paginatedData, message));
  }

  static noContent(res, message = "Resource deleted") {
    return res.status(204).json({
      success: true,
      message,
    });
  }
}

export default ApiResponse;
