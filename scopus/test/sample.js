var expect  = require('chai').expect;
var should  = require('chai').should;
var request = require('request');


describe('1) MAIN PAGE', function(done){
    it('content', function(done) {
        request('http://localhost:5000' , function(error, response, body) {
            if( body==undefined || error)
            {
                console.log(error);
            }
            else{
            expect(response.statusCode).to.equal(200);   
            }
            done();
        });
    });
    });

describe('2) LOGIN PAGE', function(done){


    
    it('Should be success for logout', function(done) {
        request.get('http://localhost:8000//auth/logout',function(error,response,body)
        {
            if( body==undefined || error)
            {
                console.log(error);
            }
            else{
                should(response.statusCode).to.equal(200);   
            }
            done();
        });
    });

    
    it('content', function(done) {
        request('http://localhost:8000/login' , function(error, response, body) {
            if( body==undefined || error)
            {
                console.log(error);
            }
            else{
                expect(response.statusCode).to.equal(200);   
            }
            done();
        });
    });


    it('Route for login', function(done) {
        request.get('http://localhost:8000//auth/orcid/login',function(error,response,body)
        {
            if( body==undefined || error)
            {
                console.log(error);
            }
            else{
                should(response.statusCode).to.equal(200);   
            }
            done();
        });
    });

    it('callback success', function(done) {
        request.get('http://localhost:8000//auth/orcid/callback',function(error,response,body)
        {
            if( body==undefined || error)
            {
                console.log(error);
            }
            else{
                should(response.statusCode).to.equal(200);   
            }
            done();
        });
    });

    it('callback success', function(done) {
        request.get('http://localhost:8000//auth/orcid/callback',function(error,response,body)
        {
            if( body==undefined || error)
            {
                console.log(error);
            }
            else{
                should(response.statusCode).to.equal(200);   
            }
            done();
        });
    });

    
});

/*

    describe('3) SEARCH PAGE', function(done){
        it('Should be failure if scopus id has alphabets or empty or more than 16 digits with hyphens', function(done) {
            let scopusId='';
            request.get('http://localhost:5000/search/citation?scopusid='+scopusId+'&submit=',function(error,response,body)
            {
                if( body==undefined || error || response==undefined)
                {
                    console.log(error);
                }
                else{
                    expect(response.statusCode).to.equal(200);   
                }
                done();
            });
        });
    });

    */

    //http://localhost:8000/search/citation?scopusid=82755170946
    //http://localhost:8000/search/scopus?keyword=gene
    //http://localhost:8000/search/serial?title=&issn=asas
    //http://localhost:8000/excel
    //http://localhost:8000/details?name=sathiyajith+K+S
    //http://localhost:8000/adding?name=sathiyajith&scopusId='12012'&authorId='145125'