import { configureStore } from '@reduxjs/toolkit';
import configReducer from './admin/web_config';
import authReducer from './auth/auth';
import plansReducer from './investmentPlans/investmentPlans';
import testimonialReducer from './testimonials/testimonials';
import transferReducer from './admin/transfer';
import withdrawalsReducer from './admin/withdrawals';
import depositeReducer from './admin/deposit';
import transactionsReducer from './transactions/transactions';
import referralReducer from './referrals/referrals';
import notificationReducer from './admin/notifications';
import send from './message/message';



// redux store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        config: configReducer,
        plans: plansReducer,
        testimonial: testimonialReducer,
        transfer: transferReducer,
        withdrawal: withdrawalsReducer,
        deposit: depositeReducer,
        transactions: transactionsReducer,
        referrals: referralReducer,
        notifications: notificationReducer,
        message: send
    }
});

