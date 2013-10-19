class User < ActiveRecord::Base
  attr_reader :entered_password
  
  include BCrypt
    def password
      @password ||= Password.new(password_hash)
    end

    def password=(pass)
      @entered_password = pass
      @password = Password.create(pass)
      self.password_hash = @password
    end

    def self.authenticate(email, password)
      user = User.find_by_email(email)
      return user if user && (user.password == password)
      nil # either invalid email or wrong password
    end
  end

end
