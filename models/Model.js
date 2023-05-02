class Model {
    constructor(model) {
    this.table = model.table;
    this.mfields = model.mfields;
    this.idField = model.idField;
    this.buildReadQuery = model.buildReadQuery;
    }
    //methods

 buildSetFields = (fields) => fields.reduce((setSQL, field, index) =>
setSQL + `${field}=:${field}` + ((index === fields.length - 1) ? '' : ', '), 'SET '
);

buildCreateQuery = (record) => {
const sql = `INSERT INTO ${this.table} ` + this.buildSetFields(this.mfields);  
return{sql,data:record}
};
buildDeleteQuery = (id) => {
const sql = `DELETE FROM ${this.table}  WHERE ${this.idField} =:${this.idField}`;
return { sql, data:{[this.idField]:id} } ;
};
 buildUpdateQuery = (record,id) => {
const sql = `UPDATE ${this.table} ` + this.buildSetFields(this.mfields)+ ` WHERE ${this.idField} =:${this.idField}`;  
return {sql,data:{...record,[this.idField]:id}};
}; 

}

export default Model;