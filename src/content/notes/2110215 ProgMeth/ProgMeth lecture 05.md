
Date: 2025-02-05
Tag: #2110215-progmeth 

#### JavaFX
---
- JavaFX components
#### Create JavaFX application
---
```java
import javafx.application.Application;
public class FXHelloWorld extends Application {
	public void start(Stage primaryStage){
		// เอาไว้ใส่หน้า UI
	}
	public static void main(String[] args) {
		launch(args);
	}
}
```
- extends Application
- override start()
- call launch()

#### Basic structure
---
- Stage (window) -> Scene (ฉากๆ) -> Scene graph (หลาย components)

#### Scene graphs
---
- JavaFX's contents จัดวางแบบ tree ด้วย scene-graph
- Scene graph เป็น tree ที่เก็บ ***nodes***
####  Nodes
---
- Root node
	- parent ของทุก nodes
	- scene graph มีได้ root เดียว
- Parent node
	- มี node ลูกได้
- Lead node
	- ไม่สมารถมีลูกได้
	- ไม่ใช่ container
- ID , Style , Class , Bounding volume , Effects (blurs , shadow) , Event handlers
- Add nodes to parent
```java
myParent.getChildren().add(childNode);
myParent.getChildren().addAll(childNode1, childNode2);
```

#### Using GUI components
---
1. Create it 
```java
Button btn = new Button("Hello world");
```
2. Configure it 
```java
// use getter/setter
btn.setText("Hello world");
```
3. Add its children
4. Add to parent
```java
root.getChildren().add(btn);
```
5. Listen to it (Events: Listeners)

#### Scene
---
- container สำหรับ scene graph
- ต้องมี root node ในการส้ราง scene
```java
StackPane root = new StackPane();
Scene scene = new Scene(root , 300 , 250);
```

#### Stage
---
- javafx.stage package
- เป็น window นึงๆ
- main stage ถูกสร้างตั้งแต่ application launch และถูก pass เข้าไปยัง start
```java
public void start(Stage primaryStage)
```
- สามารถ set title , size , icon , etc.
- application นึงมีได้หลาย stage
```java
// Set stage title
primaryStage.setTitle("MyJavaFX");
// Set scene for this stage (important)
primaryStage.setScene(scene);
// Show stage
primaryStage.show();
```

#### Layout Pane
---
- Pane
- StackPane
- FlowPane
- GridPane
- BorderPane
- HBox
- VBox

#### Grid layout
---
```java
GridPane grid = new GridPane();
Text scenetitle = new Text("Welcome");
grid.add(sceneTitle , 0 , 0 , 2 , 1)
// grid.add(component , row , col , colSpan , rowSpan);
```

#### SKIP SCENEBUILDER (ขก จด)


#### Binding Properties
---
```Java
TextField userTextField = new TextField();
Label UserNameOut = new Label();
// Unidirectional binding (เอาใน userTextField มาออก userNameOut)
userNameOut.textProperty().bind(userTextField.textProperty());

PasswordField pwBox1 = new PaswordField();
TextField pwBox2 = new TextField();
// Bidirectional binding (กรอกอันนี้ออกอันนู้นกรอกอันนู้นออกอันนี้)
pwBox1.textProperty().bindBidirectional(pwBox2.textProperty());
```

#### Event Handling
---
- setOnXXx method to register event handlers
```java
Button btn = new Button("Hello World");
btn.setOnAction(new EventHandler<ActionEvent>() {
	public void handle(ActionEvent event) {
		System.out.println("Hello World");
	}
})
```

#### ImageView & ClassLoader
---
```java
String image_path = ClassLoader.getSystemResource("images/homestay.jpg");
ImageView imageView = new ImageView(new Image(image_path));
```

