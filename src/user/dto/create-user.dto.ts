import {
    IsNotEmpty,
    IsString,
    Matches,
  } from 'class-validator';
  
  // create-user-dto
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    /**
     * Validates that the input meets the following criteria:
     * 1. The input must be exactly 6 characters long.
     * 2. The input must contain at least 2 numeric digits.
     * 3. The input can only contain letters and digits.
     * 
     * Regex breakdown:
     * - ^: Asserts the start of the string.
     * - (?=(?:.*\d){2}): Positive lookahead to ensure there are at least 2 digits in the string.
     * - [A-Za-z\d]{6}: Matches exactly 6 characters that can be either letters (uppercase or lowercase) or digits.
     * - $: Asserts the end of the string.
     * 
     * Example valid inputs: 'abc123', '1a2b34'
     * Example invalid inputs: 'abc12', '12345', 'abcdef', '1a2b3c4'
     */
    @Matches(/^(?=(?:.*\d){2})[A-Za-z\d]{4,10}$/, {
      message: 'The input must be exactly 4 to 10 characters long and include at least 2 numbers.',
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    /**
     * Validates a mobile number with an optional country code.
     * The number can have spaces, dashes, or dots as separators.
     * 
     * Regex breakdown:
     * - ^\+?: Optionally matches the leading `+` for international format.
     * - \d{1,4}: Matches the country code (1 to 4 digits).
     * - [\s.-]?: Optionally matches a separator (space, dot, or dash).
     * - \d{1,14}$: Matches the phone number part (1 to 14 digits).
     * 
     * Example valid inputs:
     * - `+1 234-567-8901`
     * - `+44 20 7946 0958`
     * - `1234567890`
     * - `+49.1234567890`
     * - `+91-9876543210`
     * 
     * Example invalid inputs:
     * - `1234-567-8901` (too short, missing country code)
     * - `+123456789012345` (too long, more than 14 digits)
     * - `+44-20-7946-0958-` (extra characters at the end)
     * - `+44 20 7946 0958-` (extra characters at the end)
     */
    @Matches(/^\+?\d{1,4}[\s.-]?\d{1,14}$/, {
      message: 'Please provide a valid mobile number.',
    })
    phone: string;

    @IsNotEmpty()
    /**
     * Validates a password to ensure it meets the following criteria:
     * - Must be between 6 and 64 characters long.
     * - Must contain at least one digit.
     * - Must contain at least one lowercase letter.
     * - Must contain at least one uppercase letter.
     * - Must contain at least one special character (e.g., @, #, $, %, ^, &, +, =).
     * 
     * Regex breakdown:
     * - ^: Asserts the start of the string.
     * - (?=.*\d): Positive lookahead to ensure at least one digit is present.
     * - (?=.*[a-z]): Positive lookahead to ensure at least one lowercase letter is present.
     * - (?=.*[A-Z]): Positive lookahead to ensure at least one uppercase letter is present.
     * - (?=.*[@#$%^&+=]): Positive lookahead to ensure at least one special character is present.
     * - .{6,64}: Matches any character (except line terminators) between 6 and 64 times.
     * - $: Asserts the end of the string.
     * - /gm: Global and multiline flags (though in this case, the multiline flag is not necessary).
     * 
     * Example valid passwords:
     * - `Password1@`
     * - `P@ssw0rd2024`
     * - `Str0ng&P@ssw0rd123`
     * - `A1b2C3d4E5f6G7h8I9j0K@lmnopQR`
     * 
     * Example invalid passwords:
     * - `password`: No uppercase letter, no special character, too short.
     * - `PASSWORD123`: No special character.
     * - `123456`: No letters, no special character.
     * - `abcDEF!`: Missing digit.
     * - `P@ssw0rd`: Less than 6 characters (excluding special characters).
     * - `LongPasswordWithNoDigitsOrSpecialChar`: Missing digits and special characters.
     */
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/gm, {
      message:
        'Password must be between 6 and 64 characters long with 1 special character and capital character each',
    })
    password: string;
  }
  