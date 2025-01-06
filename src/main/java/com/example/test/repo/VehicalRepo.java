package com.example.test.repo;

import com.example.test.model.Vehical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicalRepo extends JpaRepository<Vehical, Integer> {

}
