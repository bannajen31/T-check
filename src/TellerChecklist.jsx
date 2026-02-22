import React, { useState } from 'react';

const transactions = {
  'Cash Deposit': [
    { label: 'Verify Member', tip: 'Confirm member identity with valid government-issued ID or member recognition' },
    { label: 'Confirm Deposit Share', tip: 'Verify the specific share/account receiving the deposit' },
    { label: 'Receive & Hand-Count Cash', tip: 'Accept cash from member and count manually in their presence' },
    { label: 'Process Deposit', tip: 'Process the deposit to the correct share' },
    { label: 'Post Transaction & Provide Receipt', tip: 'Finalize transaction and print receipt for member' },
  ],
  'Check Deposit': [
    { label: 'Verify Member', tip: 'Confirm member identity with valid government-issued ID or member recognition' },
    { label: 'Select Deposit Share', tip: 'Identify and select the share/account to receive the deposit' },
    { label: 'Review Check(s)', tip: 'Examine check for date, amounts, payee, endorsement, and authenticity' },
    { label: 'Confirm Check Amount(s)', tip: 'Verify deposit amount matches check(s) total' },
    { label: 'Process Check Deposit', tip: 'Process the check deposit transaction' },
    { label: 'Scan Check(s)', tip: 'Capture check image(s) through scanner' },
    { label: 'Review/Apply Hold', tip: 'Determine if funds availability hold is required per policy' },
    { label: 'Post Transaction & Provide Receipt', tip: 'Finalize transaction and print receipt for member' },
  ],
  'Cash Withdrawal': [
    { label: 'Verify Member', tip: 'Confirm member identity with valid ID or member recognition' },
    { label: 'Confirm Withdrawal Share', tip: 'Verify the specific share/account for withdrawal' },
    { label: 'Verify Withdrawal Amount', tip: 'Confirm the withdrawal amount with member' },
    { label: 'Process Withdrawal', tip: 'Process the withdrawal transaction' },
    { label: 'Clarify Denominations', tip: 'Ask member if they need specific bill denominations' },
    { label: 'Post Transaction & Provide Receipt', tip: 'Finalize transaction and print receipt for member' },
    { label: 'Dispense Bills & Count Cash to Mbr', tip: 'Dispense cash and count aloud to member for verification' },
  ],
  "Cashier's Check": [
    { label: 'Verify Member', tip: 'Confirm member identity with valid government-issued ID' },
    { label: 'Confirm Purpose', tip: 'Document purpose of cashiers check if required' },
    { label: 'Disclose $5 Fee (if applicable)', tip: 'Inform member of the $5 fee if applicable' },
    { label: 'Verify Share & Funds', tip: 'Confirm source account and sufficient available balance' },
    { label: "Obtain All Cashier's Chk Info", tip: 'Collect all required information for the cashiers check' },
    { label: "Process Cashier's Check", tip: 'Process the cashiers check transaction' },
    { label: 'Review OFAC Results', tip: 'Review OFAC screening results before proceeding' },
    { label: 'Post Transaction & Provide Receipt', tip: 'Finalize transaction and provide receipt to member' },
    { label: 'Sign Check & Review with Mbr', tip: 'Sign the check and review all details with member' },
  ],
  'Loan Payment': [
    { label: 'Verify Member', tip: 'Confirm member identity or authorized payer' },
    { label: 'Identify Loan', tip: 'Locate correct loan account by loan number or member lookup' },
    { label: 'Verify Amount & Payment Method', tip: 'Confirm payment amount and source - cash, check, or transfer from share' },
    { label: 'Process Loan Payment', tip: 'Process the loan payment transaction' },
    { label: 'Post Transaction & Provide Receipt', tip: 'Finalize transaction and print receipt showing payment applied' },
  ],
  'Transfer': [
    { label: 'Verify Member', tip: 'Confirm member identity with valid ID or member recognition' },
    { label: 'Identify Transfer Type', tip: 'Determine type of transfer - internal, external, wire, etc.' },
    { label: 'Select "From" Share', tip: 'Identify the source account for the transfer' },
    { label: 'Select "To" Share', tip: 'Identify the destination account for the transfer' },
    { label: 'Verify Funds', tip: 'Ensure sufficient available funds in source account' },
    { label: 'Confirm Amount', tip: 'Verify exact transfer amount with member' },
    { label: 'Enter Transfer', tip: 'Key in transfer transaction details' },
    { label: 'Post Transaction', tip: 'Finalize and post the transfer' },
    { label: 'Confirm Completion', tip: 'Verify transfer completed and confirm with member' },
  ],
  'Cash Adv. - CD': [
    { label: 'Verify Member', tip: 'Confirm member identity with valid government-issued ID' },
    { label: 'Verify Card & Eligibility', tip: 'Confirm credit card is valid and member is eligible' },
    { label: 'Confirm Amount', tip: 'Verify cash advance amount with member' },
    { label: 'Process Cash Advance', tip: 'Process the cash advance transaction' },
    { label: 'Obtain Mbr Signature', tip: 'Have member sign the cash advance slip' },
    { label: 'Fill Out Cash Adv. Slip', tip: 'Complete the cash advance slip with transaction details' },
    { label: 'Post Transaction', tip: 'Finalize and post the cash advance' },
    { label: 'Disperse & Count Cash', tip: 'Dispense cash and count aloud to member' },
    { label: 'Provide Mbr Copy', tip: 'Give member their copy of the transaction' },
  ],
  'Cash Adv. - SD': [
    { label: 'Verify Member', tip: 'Confirm member identity with valid government-issued ID' },
    { label: 'Verify Card & Eligibility', tip: 'Confirm credit card is valid and member is eligible' },
    { label: 'Confirm Amount', tip: 'Verify cash advance amount with member' },
    { label: 'Obtain Mbr Signature', tip: 'Have member sign the cash advance slip' },
    { label: 'Fill Out Cash Adv. Slip', tip: 'Complete the cash advance slip with transaction details' },
    { label: 'Process Cash Advance', tip: 'Process the cash advance transaction' },
    { label: 'Post Transaction', tip: 'Finalize and post the cash advance' },
    { label: 'Provide Mbr Copy', tip: 'Give member their copy of the transaction' },
  ],
  'Cash Adv. - LP': [
    { label: 'Verify Member', tip: 'Confirm member identity with valid government-issued ID' },
    { label: 'Verify Card & Eligibility', tip: 'Confirm credit card is valid and member is eligible' },
    { label: 'Confirm Amount', tip: 'Verify cash advance amount with member' },
    { label: 'Obtain Mbr Signature', tip: 'Have member sign the cash advance slip' },
    { label: 'Fill Out Cash Adv. Slip', tip: 'Complete the cash advance slip with transaction details' },
    { label: 'Process Cash Advance', tip: 'Process the cash advance transaction' },
    { label: 'Post Transaction', tip: 'Finalize and post the cash advance' },
    { label: 'Provide Mbr Copy', tip: 'Give member their copy of the transaction' },
  ],
  'Non-Mbr Check Cashing': [
    { label: 'Review Check', tip: 'Examine check for date, amounts, payee, endorsement, and authenticity' },
    { label: "Review Mbr's Share", tip: "Verify sufficient funds in maker's account" },
    { label: 'Disclose 1% Non-Mbr Fee', tip: 'Inform non-member of the 1% check cashing fee' },
    { label: 'Collect ID Info & Phone #', tip: 'Collect valid government-issued photo ID and phone number from non-member' },
    { label: 'Collect Thumbprint', tip: 'Obtain thumbprint on check from non-member' },
    { label: 'OFAC', tip: 'Run OFAC check to verify non-member is not on prohibited list' },
    { label: 'Process on Blank Acct.', tip: 'Process the check cashing transaction on blank account' },
    { label: 'Clarify Denominations', tip: 'Ask non-member if they need specific bill denominations' },
    { label: 'Dispense Bills & Provide Receipt', tip: 'Dispense cash, count to non-member, and provide receipt' },
  ],
};

export default function TellerChecklist() {
  const [memberName, setMemberName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [transaction, setTransaction] = useState('');
  const [checked, setChecked] = useState({});
  const [saved, setSaved] = useState(false);

  const transactionOptions = Object.keys(transactions);
  const checklist = transaction ? transactions[transaction] : [];

  const handleTransactionChange = (e) => {
    setTransaction(e.target.value);
    setChecked({});
    setSaved(false);
  };

  const toggleCheck = (idx) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
    setSaved(false);
  };

  const handleReset = () => {
    setChecked({});
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const totalCount = checklist.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-sky-50 flex justify-center p-3">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3">
          <h1 className="text-white font-semibold text-center text-sm tracking-wide">
            Texell Credit Union • T-Check
          </h1>
        </div>

        <div className="p-4 space-y-4">

          {/* Member Info Row */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-emerald-700 mb-1">Member Name</label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 text-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent bg-emerald-50/50 placeholder-emerald-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-emerald-700 mb-1">Member ID</label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="ID #"
                className="w-full px-3 py-2 text-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent bg-emerald-50/50 placeholder-emerald-300"
              />
            </div>
          </div>

          {/* Transaction Type Dropdown */}
          <div>
            <label className="block text-xs font-medium text-emerald-700 mb-1">Transaction Type</label>
            <select
              value={transaction}
              onChange={handleTransactionChange}
              className="w-full px-3 py-2 text-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-emerald-50/50 text-emerald-800 cursor-pointer"
            >
              <option value="">Select transaction...</option>
              {transactionOptions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Progress Bar */}
          {checklist.length > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-emerald-600">
                <span>Progress</span>
                <span className="font-medium">{completedCount}/{totalCount}</span>
              </div>
              <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Checklist */}
          {checklist.length > 0 && (
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    checked[idx]
                      ? 'bg-gradient-to-r from-emerald-100 to-sky-100 border border-emerald-300'
                      : 'bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    checked[idx]
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300 group-hover:border-emerald-400'
                  }`}>
                    {checked[idx] && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm flex-1 transition-all duration-200 ${
                    checked[idx] ? 'text-emerald-700 line-through opacity-70' : 'text-slate-700'
                  }`}>
                    {item.label}
                  </span>

                  {/* Tooltip */}
                  <div className="absolute left-0 right-0 bottom-full mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                    {item.tip}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!transaction && (
            <div className="py-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">Select a transaction type<br/>to view checklist</p>
            </div>
          )}

          {/* Action Buttons */}
          {checklist.length > 0 && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors duration-200"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 ${
                  saved
                    ? 'bg-emerald-400'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md shadow-emerald-200'
                }`}
              >
                {saved ? '✓ Saved!' : 'Save'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-sky-50 border-t border-emerald-100">
          <p className="text-xs text-center text-emerald-500">Hover over items for further details • v1.1</p>
        </div>
      </div>
    </div>
  );
}
