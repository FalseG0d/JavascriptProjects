package tech.getarrays.employeeManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeeManager.exception.EmployeeNotFoundException;
import tech.getarrays.employeeManager.model.Employee;
import tech.getarrays.employeeManager.repo.EmployeeRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo){
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee){
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees(){
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee){
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeById(Long id){
        return EmployeeRepo.findEmployeeByID(id)
                .orElseThrow(()->new EmployeeNotFoundException("Employee: " + id + " Not Found"));
    }

    public void deleteEmployee(Long id){
        employeeRepo.deleteEmployeeById(id);
    }
}
