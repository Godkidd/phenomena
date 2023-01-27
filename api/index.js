// Build an apiRouter using express Router
const router = require('express').Router();


// Import the database adapter functions from the db
const db = require('../db');

/**
 * Set up a GET request for /reports
 * 
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */
router.get('/reports', async (req, res, next) => {
    try {
        const reports = await db.getOpenReports();
        res.send({ reports }); 
    }
    catch(ex){
        next(ex);
    }
});



/**
 * Set up a POST request for /reports
 * 
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */
router.post('/reports', async (req, res, next) => {
    try {
        const report = await db.createReport(req.body);
        res.send(report); 
    }
    catch(ex){
        next(ex);
    }
});



/**
 * Set up a DELETE request for /reports/:reportId
 * 
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */



/**
 * Set up a POST request for /reports/:reportId/comments
 * 
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */



// Export the apiRouter
module.exports = router;

