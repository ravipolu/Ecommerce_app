import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST, 
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,

    DELATE_PRODUCT_REQUEST,
    DELATE_PRODUCT_SUCCESS ,
    DELATE_PRODUCT_RESET,
    DELATE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELATE_REVIEW_RESET,
    DELETE_REVIEW_RESET,

} from "../constants/productConstant.js";



export const productsReducer = ((state = {products:[]}, action)=>{

    switch (action.type){
        case ALL_PRODUCT_REQUEST :
        case ADMIN_PRODUCT_REQUEST :    
            return{
                loading:true,
                products: []
        }
        case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload.products,
                productsCount:action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount : action.payload.filteredProductsCount,
        }
        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading:false,
                products: action.payload,
            }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:    
            return{
                loading:false,
                error:action.payload
        }
        case CLEAR_ERRORS:
            return{
            ...state,
            error:null
        }
        default:
            return state;
    }

})



export const newProductReducer= (state = {products: {} }, action) =>{
    switch(action.type){
        case NEW_PRODUCT_REQUEST:
            return{
                loading: true,
                ...state
            }
        case NEW_PRODUCT_SUCCESS:
            return{
                loading:false,
                success:action.payload.success,
                product:action.payload.products
            }    
        case NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }   
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success:false,
            }    
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;        
            
    }
}






export const productDetailReducer= (state = { product:{} }, action) =>{
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return{
                loading: true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
            return{
                loading:false,
                product:action.payload,
            }    
        case PRODUCT_DETAIL_FAIL:
            return{
                loading:false,
                error:action.payload,
            }       
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;        
            
    }
}


export const productReviewsReducer= (state = { reviews: [] }, action) =>{
    switch(action.type){
        case ALL_REVIEW_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case ALL_REVIEW_SUCCESS:
            return{
                loading:false,
                product:action.payload,
            }    
        case ALL_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }           
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;        
            
    }
}



export const productReducer= (state = {  }, action) =>{
    switch(action.type){
        case DELATE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:    
            return{
                loading: true,
                ...state
            }
        case DELATE_PRODUCT_SUCCESS:   
            return{
                ...state,
                loading:false,
                isDeleted:action.payload,
            }   
        case UPDATE_PRODUCT_SUCCESS:    
            return{
                ...state,
                loading:false,
                isUpdated:action.payload,
            }         
        case DELATE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:    
            return{
                ...state,
                loading:false,
                error:action.payload,
            }   
        case UPDATE_PRODUCT_RESET: 
            return{
                ...state,
                isUpdated:false,
            }    
        case DELATE_PRODUCT_RESET:
            return{
                ...state,
                isDeleted:false,
            }       
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;        
            
    }
}



export const newReviewReducer= (state = {  }, action) =>{
    switch(action.type){
        case NEW_REVIEW_REQUEST:
            return{
                loading: true,
                ...state
            }
        case NEW_REVIEW_SUCCESS:
            return{
                loading:false,
                success:action.payload,
            }    
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }   
        case NEW_REVIEW_RESET:
            return{
                ...state,
                success:action.payload,
                loading:false
            }       
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;        
            
    }
}



export const reviewReducer= (state = {  }, action) =>{
    switch(action.type){
        case DELETE_REVIEW_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case DELETE_REVIEW_SUCCESS:
            return{
                loading:false,
                isDeleted:action.payload,
            }    
        case DELETE_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }   
        case DELETE_REVIEW_RESET:
            return{
                ...state,
                isDeleted:false
            }       
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;        
            
    }
}



