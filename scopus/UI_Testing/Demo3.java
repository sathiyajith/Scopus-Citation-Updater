package test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Demo3 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		 
		System.setProperty("webdriver.chrome.driver","C:\\Users\\sathiyajith\\Desktop\\chromedriver.exe");
		  WebDriver driver=new ChromeDriver();
		  driver.get("http://localhost:8000/index#Serial");
		  driver.findElement(By.id("li4")).click();
		  driver.manage().window().maximize();
		  driver.findElement(By.id("serialTitle")).sendKeys("gene");
		  driver.findElement(By.id("issn")).sendKeys("671536");
		  driver.findElement(By.id("searchSubmit")).click();
		  String at=driver.getTitle();
		  System.out.println("Actual page: "+at);
		  String et="Scopus Citation Updater";
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
