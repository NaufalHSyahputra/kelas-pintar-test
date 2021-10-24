const express = require("express");
const {
  getBelowAverageStudents,
} = require("../modules/reports/actions/get_below_average_students");
const {
  getStudentReports,
} = require("../modules/reports/actions/get_students_reports");
const {
  getTop3Students,
} = require("../modules/reports/actions/get_top3_students");

const router = express.Router();
/**
 * @openapi
 *  components:
 *    schemas:
 *      StudentReportsResult:
 *        type: object
 *        properties:
 *          student_id:
 *            type: integer
 *            description: Student ID.
 *          name:
 *            type: string
 *            description: Student Name.
 *          subject_name:
 *            type: string
 *            description: Subject Name.
 *          grade:
 *            type: string
 *            description: Student Grade.
 *          avg:
 *            type: integer
 *            description: Average of scores from all related chapters in a given subject.
 *          comparison_result:
 *            type: string
 *            description: Comparasion between Average of scores from all related chapters in a given subject and grade's average.
 *
 */
/**
 * @openapi
 *  components:
 *    schemas:
 *      Top3Result:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: Student ID.
 *          name:
 *            type: string
 *            description: Student Name.
 *          grade:
 *            type: string
 *            description: Student Grade.
 *          avg:
 *            type: integer
 *            description: average of all scores in their performance report.
 *
 */
/**
 * @openapi
 *  components:
 *    schemas:
 *      BelowAverageResult:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: Student ID.
 *          name:
 *            type: string
 *            description: Student Name.
 *          grade:
 *            type: string
 *            description: Student Grade.
 *
 */
/**
 * @openapi
 * /reports:
 *   get:
 *    summary: "A students performance report of all subjects they are learning, and compare the scores in each subject with the grades average."
 *    responses:
 *     "200":
 *       description: A list of students performance report.
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StudentReportsResult'
 */
router.get("/", async (req, res) => getStudentReports(req, res));
/**
 * @openapi
 * /reports/top3:
 *   get:
 *    summary: "Top 3 students of each grade based on the highest average of all scores in their performance report."
 *    responses:
 *     "200":
 *       description: A list of Top 3 students groupped by grade.
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Top3Result'
 */
router.get("/top3", async (req, res) => getTop3Students(req, res));
/**
 * @openapi
 * /reports/below-average:
 *   get:
 *    summary: A list of student names and their grade that have below average scores in ALL subjects.
 *    responses:
 *     "200":
 *       description: A list of student names and their grade.
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StudentReportsResult'
 */
router.get("/below-average", async (req, res) =>
  getBelowAverageStudents(req, res)
);

module.exports = router;
