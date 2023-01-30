const { Client } = require("pg");

const client = new Client('postgres://localhost/phenomena-dev');

async function getOpenReports() {
  try {
    const { rows: reports } = await client.query(`
      SELECT * FROM reports
      WHERE "isOpen"=true;
    `);
    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      const { rows: comments } = await client.query(
        `
      SELECT * FROM comments where "reportId"=$1
      `,
        [report.id]
      );
      report.comments = [];
      for (let j = 0; j < comments.length; j++) {
        report.comments.push(comments[j]);
      }
      const expiration = Date.parse(report.expirationDate);
      const currentDate = Date.now();
      report.isExpired = expiration < currentDate;
    }
    return reports;
  } catch (error) {
    throw error;
  }
}

async function createReport(reportFields) {
  const { title, location, description, password } = reportFields;

  try {
    const SQL = `
      INSERT INTO reports(title, location, description, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const response = await client.query(SQL, [
      title,
      location,
      description,
      password,
    ]);
    const report = response.rows[0];
    delete report.password;
    return report;
  } catch (error) {
    throw error;
  }
}

async function _getReport(reportId) {
  try {
    const SQL = `
      SELECT * FROM reports
      WHERE id = $1;
    `
    const { rows } = await client.query(SQL, [reportId]);
    const report= rows[0]
    return report;
  } catch (error) {
    throw error;
  }
}


async function closeReport(reportId, password) {
  try {
    const report = await _getReport(reportId)
    if (report === undefined){
      throw new Error("Report does not exist with that id")
    }
    else if(report.password !== password){
      throw new Error('Password incorrect for this report, please try again')
    }
    else if(report.isOpen === false){
      throw new Error('This report has already been closed')
    } else if(report.isOpen === true) {
        await client.query(`
          UPDATE reports
          SET "isOpen"='false'
          WHERE id=$1;
        `, [reportId]);
    return {"message": "Report successfully closed!"}
    }
  } catch (error) {
    throw error;
  }
}

async function createReportComment(reportId, commentFields) {
  try {
    const { rows: [reports] } = await client.query(`
    SELECT * FROM reports
    WHERE id = $1`, [reportId]);
    if (reports===undefined){
      throw new Error ('That report does not exist, no comment has been made');

    }

    const expiration = Date.parse(reports.expirationDate);
    const currentDate = Date.now();
    if(!reports.isOpen){
      throw new Error ('That report has been closed, no comment has been made');
  }
  if (expiration < currentDate){
    throw new Error ('The discussion time on this report has expired, no comment has been made');

  }

  const { rows: [comment] } = await client.query(`
    INSERT INTO comments ("reportId", content )
    VALUES ($1, $2)
    RETURNING *`, [reportId, commentFields.content]
  )
    console.log("looking for comment", comment);
    if(comment.content){
      return comment;
    }

  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createReport,
  getOpenReports,
  _getReport,
  closeReport,
  createReportComment,
};
