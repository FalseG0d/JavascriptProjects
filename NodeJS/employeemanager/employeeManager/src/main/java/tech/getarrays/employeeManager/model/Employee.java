package tech.getarrays.employeeManager.model;

import javax.persistence.*;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@Entity
@AllArgsConstructor
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String jobTitle;

    @Getter
    @Setter
    private String phone;

    @Getter
    @Setter
    private String imageURL;

    @Getter
    @Setter
    @Column(nullable = false, updatable = false)
    private String employeeCode;

    public Employee(){

    }

    @Override
    public String toString(){
        return "Employee{" +
                "id="+id+
                ", name="+name+
                ", email-"+email+
                ", jobTitle"+jobTitle+
                ", phone="+phone+
                ", imageURL="+imageURL+
                "}";
    }
}
