package com.statechoose.Backendstates.controller;

import com.statechoose.Backendstates.exception.ResourceNotFoundException;
import com.statechoose.Backendstates.model.State;
import com.statechoose.Backendstates.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class StateController {

    @Autowired
    private StateRepository stateRepository;

    // get all states

    @GetMapping("/states")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    // get single state by id

    @GetMapping("/states/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<State> getStateById(@PathVariable int id) {

        State state = stateRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("State doesn't exist with " + id));

        return ResponseEntity.ok(state);
    }


}
