import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') //route group
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

 /**
   * Handles POST requests to create a new user.
   * @param createUserDto - Data transfer object containing user details.
   * @returns Response object with status code and message indicating success or failure.
   */

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      await this.userService.create(
        createUserDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'User Created Successfully',
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || 'Internal Server Error',
      }, HttpStatus.BAD_REQUEST); // or HttpStatus.CONFLICT or another appropriate status code 
    }
  }

/**
   * Handles GET requests to fetch all users.
   * @returns Response object with status code, user data, and message indicating success or failure.
   */

  @Get()
  async findAll() {
    try {
      const data =
        await this.userService.findAll();
        return {
          statusCode: HttpStatus.OK,
          success: true,
          data,
          message: 'User Fetched Successfully',
        };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || 'Internal Server Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR);  
    }
  }

  /**
   * Handles GET requests to fetch a specific user by ID.
   * @param id - User ID to fetch.
   * @returns Response object with status code, user data, and message indicating success or failure.
   * Throws 404 Not Found if the user is not found.
   */

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(
        +id,
      );
      if (!data) {
        throw new HttpException({
          success: false,
          message: 'User Not Found',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        success: true,
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || 'Internal Server Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR);  
    }
  }

/**
   * Handles PATCH requests to update a specific user by ID.
   * @param id - User ID to update.
   * @param updateUserDto - Data transfer object containing updated user details.
   * @returns Response object with status code and message indicating success or failure.
   * Throws 404 Not Found if the user is not found or update fails.
   */

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const result = await this.userService.update(+id, updateUserDto);
      if (!result) {
        throw new HttpException({
          success: false,
          message: 'User Not Found or Update Failed',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'User Updated Successfully',
      };  
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || 'Internal Server Error',
      }, HttpStatus.BAD_REQUEST); // or HttpStatus.NOT_FOUND if the error indicates the user was not found  
    }
  }

 /**
   * Handles DELETE requests to remove a specific user by ID.
   * @param id - User ID to remove.
   * @returns Response object with status code and message indicating success or failure.
   * Throws 404 Not Found if the user is not found or deletion fails.
   */

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.userService.remove(+id);
      if (!result) {
        throw new HttpException({
          success: false,
          message: 'User Not Found or Deletion Failed',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || 'Internal Server Error',
      }, HttpStatus.BAD_REQUEST); // or HttpStatus.NOT_FOUND if the error indicates the user was not found  
    }
  }
}
