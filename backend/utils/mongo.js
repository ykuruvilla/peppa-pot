const findDocumentByField = async (Model, field) => {
  try {
    const document = await Model.findOne({ field });
    return document;
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

module.exports = findDocumentByField;
