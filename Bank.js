// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)
    createAccount(name, initialDeposit) {
        const account = {
            name: name,
            balance: initialDeposit
        };
        this.accounts.push(account);
        const newUserAccount = new Account(account.name, account.balance)
        return newUserAccount;
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }
    deposit(amount) {
        this.balance += amount;
        this.transactionHistory.push({ transactionType: 'Deposit', amount: amount });
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount: amount });
        } else {
            console.log('Insufficient funds');
        }
    }

    // Example: transfer(amount, recipientAccount)
    transfer(amount, recipientAccount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            recipientAccount.deposit(amount);
            this.transactionHistory.push({
                transactionType: 'Transfer', amount: amount, to: recipientAccount.name
            });
            recipientAccount.transactionHistory.push({
                transactionType: 'Deposit', amount: amount, from: this.name
            });
        } else {
            console.log('Insufficient funds');
        }
    }
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }

    // Example: checkBalance()
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return {
        johnFinalBalance,
        janeFinalBalance,
        johnTransactionHistory: johnAccount.transactionHistory,
        janeTransactionHistory: janeAccount.transactionHistory
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
