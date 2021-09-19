const { BadRequestException,  } = require('../../common/httpException');

class CreateUrlValidatorImpl {
    groupRepository;

    constructor() {
        
    }
    /**
     * 
     * Validate bad words
     */
    async validate(slug) {
      
    }
}

export const CreateUrlValidator = new CreateUrlValidatorImpl();
