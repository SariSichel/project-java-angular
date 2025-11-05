package com.example.project.mappers;

import com.example.project.dto.CategoryDTO;
import com.example.project.model.Category;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")

public interface CategoryMapper {

    CategoryDTO categoryToDTO(Category c);

    List<CategoryDTO> categoriesToDTO(List<Category> c);

    Category categoryDTOtoCategory(CategoryDTO c);
}
