const router = require('express').Router();

import { createIncomeRecord, getAllIncomeRecords, getIncomeRecordById, DeleteIncomeRecordById, editIncomeRecord } from '../controllers/income';
import { createExpenseRecord, getAllExpenseRecords, getExpenseRecordById, DeleteExpenseRecordById, editExpenseRecord } from '../controllers/expense';
import { verifyToken } from '../utils/token';
import { grantAccess } from '../controllers/access';


// income router
router.route('/income/create').post(verifyToken, grantAccess('create', 'transaction'), createIncomeRecord);
router.route('/income/readAll').get(verifyToken, grantAccess('readAny', 'transaction'), getAllIncomeRecords);
router.route('/income/readById/:incomeId').get(verifyToken, grantAccess('readAny', 'transaction'), getIncomeRecordById);
router.route('/income/delete/:incomeId').delete(verifyToken, grantAccess('deleteAny', 'transaction'), DeleteIncomeRecordById);
router.route('/income/update/:incomeId').patch(verifyToken, grantAccess('updateAny', 'transaction'), editIncomeRecord);

// expense router
router.route('/expense/create').post(verifyToken, grantAccess('create', 'transaction'), createExpenseRecord);
router.route('/expense/readAll').get(verifyToken, grantAccess('readAny', 'transaction'), getAllExpenseRecords);
router.route('/expense/readById/:expenseId').get(verifyToken, grantAccess('readAny', 'transaction'), getExpenseRecordById);
router.route('/expense/delete/:expenseId').delete(verifyToken, grantAccess('deleteAny', 'transaction'), DeleteExpenseRecordById);
router.route('/expense/update/:expenseId').patch(verifyToken, grantAccess('updateAny', 'transaction'), editExpenseRecord );


export default router;
