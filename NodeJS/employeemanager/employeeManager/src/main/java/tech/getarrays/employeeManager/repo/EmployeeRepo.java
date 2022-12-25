package tech.getarrays.employeeManager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeeManager.model.Employee;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    static Optional<Employee> findEmployeeByID(Long id) {
        return null;
    }

    void deleteEmployeeById(Long id);
}
