package test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Demo4 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.setProperty("webdriver.chrome.driver","C:\\Users\\sathiyajith\\Desktop\\chromedriver.exe");
		  WebDriver driver=new ChromeDriver();
		  driver.get("http://localhost:8000/excel");
		  driver.manage().window().maximize();
		  driver.findElement(By.id("addNew")).click();
		  String bt=driver.getTitle();
		  String ct="New Faculty";
		  if(bt.equalsIgnoreCase(ct)) {
			  driver.get("http://localhost:8000/addNew");
		  driver.findElement(By.id("facultyName")).sendKeys("sathiyajith K S");
		  driver.findElement(By.id("scopusId")).sendKeys("212121");
		  driver.findElement(By.id("authorId")).sendKeys("123254");
		  driver.findElement(By.id("addFaculty")).click();
		  String at=driver.getTitle();
		  System.out.println("Actual page: "+at);
		  String et="Excel";
		  System.out.println("Expected page: "+et);
		  driver.close();
		  if(at.equalsIgnoreCase(et)) {
			  System.out.println("Test success");
		  }
		  else {
			  System.out.println("test fail");
		  }
	}}
		  }


