const { groupBy } = require("../../../helpers/groupby");
const {
  getAverageAllStudentScore,
} = require("../repositories/report_repository");

exports.getTop3Students = async (req, res) => {
  // get all student performance report and average score
  const students = await getAverageAllStudentScore();

  return res.json(
    groupBy(students, "grade")
      .filter((el, index) => index !== 0)
      .map((el) => el.sort((a, b) => b.avg - a.avg).slice(0, 3))
  );
};
