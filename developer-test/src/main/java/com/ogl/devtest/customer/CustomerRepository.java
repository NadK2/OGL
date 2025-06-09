package com.ogl.devtest.customer;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
  Optional<Customer> findByName(String name);

  @Query("SELECT new com.ogl.devtest.customer.CityCustomerCount(c.city, COUNT(c)) FROM Customer c GROUP BY c.city")
  List<CityCustomerCount> countCustomersByCity();

}
