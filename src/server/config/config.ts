const env = process.env.NODE_ENV;
let config: {[key:string]:any};
console.log(env);
//DEVELOPMENT
if (env === 'development') {
  
    config ={
        MONGODB_DATABASE: "mlstest"
    }
} else {
    config ={
        MONGODB_DATABASE: "mls"
    }
}
export default config;



