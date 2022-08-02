import { configureStore } from '@reduxjs/toolkit';
import configReducer from './admin/web_config';
import authReducer from './auth/auth';
import plansReducer from './investmentPlans/investmentPlans';
import testimonialReducer from './testimonials/testimonials';
import transferReducer from './admin/transfer';
import withdrawalsReducer from './admin/withdrawals';
import investmentReducer from './invest/invest';
import depositeReducer from './admin/deposit';



// redux store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        config: configReducer,
        plans: plansReducer,
        testimonial: testimonialReducer,
        transfer: transferReducer,
        withdrawal: withdrawalsReducer,
        investment: investmentReducer,
        deposit: depositeReducer
    }
});

