package com.hcl.expensebackend.controller;

import com.hcl.expensebackend.entity.Expense;
import com.hcl.expensebackend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // =========================
    // EMPLOYEE APIs
    // =========================

    // POST - add new expense
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    /*
     * GET - fetch expenses
     * Supports BOTH:
     * 1) /api/expenses              -> returns all (existing behavior)
     * 2) /api/expenses?page=0&size=10 -> paginated
     */
    @GetMapping
    public List<Expense> getExpenses(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        if (page != null && size != null) {
            Page<Expense> expensePage = expenseService.getExpensesPaginated(page, size);
            return expensePage.getContent();
        }

        // fallback to old behavior
        return expenseService.getAllExpenses();
    }

    // =========================
    // MANAGER APPROVAL APIs
    // =========================

    @PutMapping("/{id}/approve")
    public Expense approveExpense(@PathVariable Long id) {
        return expenseService.approveExpense(id);
    }

    @PutMapping("/{id}/reject")
    public Expense rejectExpense(@PathVariable Long id) {
        return expenseService.rejectExpense(id);
    }

    @PutMapping("/{id}/escalate")
    public Expense escalateExpense(@PathVariable Long id) {
        return expenseService.escalateExpense(id);
    }
}
