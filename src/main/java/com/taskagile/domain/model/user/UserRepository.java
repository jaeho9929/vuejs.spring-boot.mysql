package com.taskagile.domain.model.user;

// import java.util.Date;
// import java.util.List;

// import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

public interface UserRepository {

  User findByUsername(String username);
  User findByEmailAddress(String emailAddress);
  void save(User user);
}

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {
//   User findByUsername(String username);
//   User findByEmailAddress(String emailAddress);

//   // List<User> findByCreatedDateBetween(Date date, Date Date);
//   // List<User> findByLastNameOrderByFirstNameDesc(String lastName);
//   // List<User> findByLastName(String lastName, Pageable pageable);
// }
