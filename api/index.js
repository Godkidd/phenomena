const router = require('express').Router();

const db = require('../db');

router.get('/reports', async (req, res, next) => {
    try {
        const reports = await db.getOpenReports();
        res.send({ reports }); 
    }
    catch(ex){
        next(ex);
    }
});


router.post('/reports', async (req, res, next) => {
    try {
        const report = await db.createReport(req.body);
        res.send(report); 
    }
    catch(ex){
        next(ex);
    }
});

 router.delete('/reports/:reportId', async (req, res, next)=> {
    try {
        const { reportId } = req.params;
        const { password } = req.body;
        const report = await db.closeReport(reportId, password);
        console.log(report, "looking for report Id");
        res.send(report);
    } catch (ex) {
        next(ex);
    }
});


 router.post('/reports/:reportId/comments', async (req, res, next)=> {
    try {
        const { reportId } = req.params;
        const report = await db.createReportComment(reportId, req.body);
        res.send(report);
    } catch (ex) {
        next(ex);
    }
});


module.exports = router;

