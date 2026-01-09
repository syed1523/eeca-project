package com.hcl.expensebackend.service;

import com.hcl.expensebackend.entity.Expense;
import com.hcl.expensebackend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // =========================
    // EMPLOYEE OPERATIONS
    // =========================

    // Save expense
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Get all expenses (non-paginated)
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Get expenses with pagination
    public Page<Expense> getExpensesPaginated(int page, int size) {
        return expenseRepository.findAll(PageRequest.of(page, size));
    }

    // =========================
    // MANAGER OPERATIONS
    // =========================

    public Expense approveExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setStatus("APPROVED");
        expense.setRemark("Approved by manager");
        expense.setReviewedBy("MANAGER");
        expense.setReviewedAt(LocalDate.now());

        return expenseRepository.save(expense);
    }

    public Expense rejectExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setStatus("REJECTED");
        expense.setRemark("Rejected by manager");
        expense.setReviewedBy("MANAGER");
        expense.setReviewedAt(LocalDate.now());

        return expenseRepository.save(expense);
    }

    public Expense escalateExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setStatus("ESCALATED");
        expense.setRemark("Escalated to auditor");
        expense.setReviewedBy("MANAGER");
        expense.setReviewedAt(LocalDate.now());

        return expenseRepository.save(expense);
    }
}
