package test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Demo2 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		  System.setProperty("webdriver.chrome.driver","C:\\Users\\sathiyajith\\Desktop\\chromedriver.exe");
		  WebDriver driver=new ChromeDriver();
		  driver.get("https://orcid.org/signin?oauth&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Forcid%2Fcallback&scope=%2Fauthenticate&state=GmoHroEUceW6FHyHwgUKhKgY&client_id=APP-H1VKA3G0PJUY7B5B");
		  driver.manage().window().maximize();
		  driver.findElement(By.id("userId")).sendKeys("kssathiya19@gmail.com");
		  driver.findElement(By.id("password")).sendKeys("kss@123456");
		  driver.findElement(By.id("form-sign-in-button")).click(); 
		  driver.get("http://localhost:5000/index");
		  driver.manage().window().maximize();
		  driver.findElement(By.id("keyWord")).sendKeys("gene");
		  driver.findElement(By.id("keywordSubmit")).click();
		  String at=driver.getTitle();
		  System.out.println("Actual page: "+at);
		  String et="Scopus Search";
		  System.out.println("Expected page: "+et);
		  driver.close();
		  if(at.equalsIgnoreCase(et)) {
			  System.out.println("Test success");
		  }
		  else {
			  System.out.println("test fail");
		  }
	}

}
