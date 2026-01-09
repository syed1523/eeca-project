package com.hcl.expensebackend.repository;

import com.hcl.expensebackend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
