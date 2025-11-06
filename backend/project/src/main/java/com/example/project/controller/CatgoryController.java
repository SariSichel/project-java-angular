package com.example.project.controller;

import com.example.project.dto.CategoryDTO;
import com.example.project.mappers.CategoryMapper;
import com.example.project.model.Category;
import com.example.project.model.Post;
import com.example.project.service.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/Category")
@RestController
@CrossOrigin
public class CatgoryController {

    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;

    @Autowired
    public CatgoryController(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @GetMapping("/getCategoryById/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id){
        try{
            Category c=categoryRepository.findById(id).orElse(null);
            if(c==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(categoryMapper.categoryToDTO(c), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category t) {
        try {
            Category c = categoryRepository.save(t);
            return new ResponseEntity<>(c, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //הפונקציה רצה טוב אבל מחזירה שדות null
    //החזרתי מסוג קטגוריה רגילה
    @GetMapping("/getCategories")
    public ResponseEntity <List<CategoryDTO>> getCategories(){
        try{
            return new ResponseEntity<>(categoryMapper.categoriesToDTO(categoryRepository.findAll()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
