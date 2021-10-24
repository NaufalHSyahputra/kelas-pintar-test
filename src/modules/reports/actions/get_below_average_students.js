const { groupBy } = require("../../../helpers/groupby");
const {
  getAllStudentReports,
  getGradeAverage,
} = require("../repositories/report_repository");

exports.getBelowAverageStudents = async (req, res) => {
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
  // Group By data by student id
  const groupped = groupBy(newStudents, "student_id");
  // filter students who have below average score in ALL subject
  const belowAverageStudents = groupped
    .filter((el) => {
      const noAbove = el.filter(
        (ell) => ell.comparasion_result !== "Above Average Score"
      );
      return noAbove.length === el.length;
    })
    .map(
      (el) =>
        el.map((ell) => ({
          id: ell.student_id,
          name: ell.name,
          grade: ell.grade,
        }))[0]
    );
  return res.json(belowAverageStudents);
};
