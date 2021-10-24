const {
  getAllStudentReports,
  getGradeAverage,
} = require("../repositories/report_repository");

exports.getStudentReports = async (req, res) => {
  // get all student performance report and average score
  const students = await getAllStudentReports();
  // get grade average
  const gradeAverages = await getGradeAverage();

  const newStudents = students.map((el) => {
    const gradeAverage = gradeAverages.find((gavg) => gavg.grade === el.grade);
    return {
      ...el,
      comparasion_result:
        el.avg >= gradeAverage.avg
          ? "Above Average Score"
          : "Below Average Score",
    };
  });
  return res.json(newStudents);
};
