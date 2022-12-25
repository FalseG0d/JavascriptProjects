package tech.getarrays.employeeManager.exception;

public class EmployeeNotFoundException extends RuntimeException{
    public EmployeeNotFoundException(String s) {
        super(s);
    }
}
