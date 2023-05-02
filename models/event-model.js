const model = {};

model.table ='Events';
model.mfields= [ 'EventID','Venue', 'Date','LocalBoxer','ForeignBoxer','Referee'];
model.mfields2= [ 'Name','Address', 'Email_Address','Phone_Number'];
model.idField = 'EventID';
model.table2 ='Referees';
model.buildReadQuery = (id,variant) => {
    let sql;
    const table ='Events'
    const fields = [model.idField,...model.mfields]
    switch(variant){
      case 'Venue':
      sql =`SELECT DISTINCT ${'Venue'} FROM ${model.table}`;
      break;
      case 'Referees':
        sql =`SELECT ${model.mfields2} FROM ${model.table2} WHERE Name = "Dave"`;
        break;
      case 'LocalBoxer':
      sql =`SELECT DISTINCT ${'LocalBoxer'} FROM ${model.table} ORDER BY 'LocalBoxer' `;
      break;
      case 'ForeignBoxer':
      sql =`SELECT DISTINCT ${'ForeignBoxer'}  FROM ${model.table} ORDER BY 'ForeignBoxer'`;
      break;
      case 'PrevEvents':
        sql = `SELECT * FROM ${model.table} WHERE ${'Date'} < NOW() LIMIT 4`;
      break;
      case 'UpcomingEvents':
        sql = `SELECT * FROM ${model.table} WHERE ${'Date'} > NOW()`;
      break;
      default:
      sql = `SELECT ${model.mfields} FROM ${model.table} LIMIT 8`;
      if (id) sql += ` WHERE EventID=:ID `;
    }
    
    return {sql, data:{ID:id} };
  };

  export default model;