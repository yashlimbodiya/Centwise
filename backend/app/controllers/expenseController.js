import * as expenseService from '../services/expense-services.js';

export const addExpense = async function(request, response){
      try {

            const expenseDocuments = await expenseService.addExpense(request); 
        
            //console.log(userDocuments);
            // Respond with a success message
            response.status(200).json({ message: 'Expense created successfully', expenseDocuments });
          } catch (error) {
            // Handle errors
            console.error('Error creating Expense:', error);
            response.status(500).json({ message: 'Internal Server Error' });
          }
}
