import policyConfig from "../config/policyConfig.js";
export function validateExpense(amount,category){
    const policy = policyConfig[category];
    if (!policy) {
        return {
            status: "VIOLATION",
            remark: "Invalid expense category"
        };
    }

    const limit = policy.limit;
    if(amount<=limit){
        return {
            status : "APPROVED",
            remark : `Within allowed limit of ₹${limit}`
        };
    }
    if(amount<=limit*1.2){
        return {
            status : "WARNING",
            remark : `Slightly exceeds limit of ₹${limit}`
        };
    }
        return {
            status : "VIOLATION",
            remark : `Exceeds limit of ₹${limit}`
        };

}