package com.package2.service.impl;

import com.package2.dao.TypeDao;
import com.package2.pojo.Type;
import com.package2.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeServiceImpl implements TypeService {
    @Autowired
    private TypeDao typeDao;

    @Override
    public List<Type> getAll() {
        return typeDao.selectAll();
    }

    @Override
    public int addType(Type type) {
        return typeDao.add(type);
    }

    @Override
    public int updateType(Type type) {
        return typeDao.update(type);
    }
}