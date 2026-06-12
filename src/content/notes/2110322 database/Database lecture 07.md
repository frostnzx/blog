
Date: 2025-02-04
Tag: #2110322-database 


#### MongoDB
---
- Schema-les NoSQL document database
- แต่ละ document (row) อาจะมี field (column) ไม่เท่ากัน
- เก็บแบบ JSON/BSON
- เหมาะกับ unstructured
- Scale ได้ดี
- PgSQL vs MongoDB
	- Database -> Database
	- Table -> Collection
	- Row -> Document
	- Column -> Field
	- Joins -> $lookup

#### Document Schema
---
- เป็น JSON object ที่ใช้กำหนดองคืประกอบของเนื้อหาภายใน document 
- บางครั้งเราก็ยังอยาก control ข้อมูลในการ input หรือ update เลยต้องมีการกำหนด schema แต่ไม่ต้องกำหนดก็ได้
```json
{
"bsonType": "object",
"required": ["name", "age", "favoriteColors"],
"properties": {
"name": {
"bsonType": "string"
},
"age": {
"bsonType": "int",
"minimum": 13,
"exclusiveMinimum": false
},
"favoriteColors": {
"bsonType": "array",
"uniqueItems": true,
"items": {
"bsonType": "object",
"properties": {
"rank": { "bsonType": "int" },
"name": { "bsonType": "string" },
"hexCode": {
"bsonType": "string",
"pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
}
}
}
}
}
```

#### การออกแบบ Schema
---
- ไม่มีกฎเกณฑ์ตายตัว
- ต้องตัดสินใจว่าจะเก็บข้อมูลแบบใด
	- Embedding -> เก็บใน document เดียวเป็น key-value ใหม่
	- Referencing -> เก็บใน collection ใหม่ ลิงค์กันผ่าน operator ชื่อ $lookup

#### One-to-one / One-to-few
---
- one document to one document 
- one document to few documenr
```json
// patron document
{
   _id: "joe",
   name: "Joe Bookreader"
}
// address document
{
   street: "123 Fake Street",
   city: "Faketon",
   state: "MA",
   zip: "12345"
}
// this is one to one cause patron only got 1 address
// so we should just embed it 
{
   _id: "joe",
   name: "Joe Bookreader",
   address: {
              street: "123 Fake Street",
              city: "Faketon",
              state: "MA",
              zip: "12345"
            }
}
```
- ทั้ง one to one และ one to few ควรใช้ Embedding ทั้่งคู่

#### One-to-many
---
- product ชี้ไปหา part
```json
// Product document
{
	"name" : "left-handed smoke shifter",
	"manufacturer" : "Acme Corp",
	"catalog_number" : "1234",
	"parts" : ["ObjectID('AAAA')","ObjectID('BBBB')] 
}
// Part document
{
	"_id" : "ObjectID('AAAA')",
	"partno" : "123-aff-456",
	"name" : "#4 grommet",
	"qty" : "94",
	"price" : "3.99"
}
```

#### One-to-squillions
---
- คือมีเยอะมากเช่นข้อมูล log
- ควรแยก document แน่นอน
- แต่ต่างกับ one-to-many คือเช่นถ้าเป็นตัวข้อมูล log, log ก็จะชี้กลับไปหา host แทน
```json
{
	"_id" : ObjectID("AAAB"),
	"name" : "goofy.example.com",
	"ipaddr" : "127.66.66.66"
}

{
	"time" : ISODate("2014-03-28T09:42:41.382Z"),
	"message" : "cpu is on fire!",
	"host": ObjectID("AAAB")
}
```

#### Many-to-Many
---
- ชี้ไปชี้กลับ
```json
{
	"_id" : ObjectID("AAF1"),
	"name" : "Kate Monster",
	"tasks" : [ObjectID("ADF9"),ObjectID("AE02")]
}
{
	"_id" : ObjectID("ADF9"), 
	"description" : "......",
	"due_date" : ISODate("2014-04-01"),
	"volunteers" : [ObjectID("AAF1")]
}
```

#### Mongosh
---
- show dbs -> โชว์รายชื่อ database
- show collections -> โชว์รายชื่อ collections
- use DATABASE_NAME -> ใช้หรือสร้างถ้ายังไม่มี

##### create collection
---
- db.createCollection(name , option)
##### drop collection
---
- db.collection_name.drop()
##### insert in collection
---
```json
db.post.insertOne({
        'title': 'MongoDB Overview',
        'description': 'An introduction to MongoDB / document database',
        'owner': 'lionking',
        'url': 'http://mdslab.unime.it/sites/default/files/mongodb_tutorial.pdf',
        'tags': ['mongodb','database','NoSQL'],
        'likes': 250})
```

```json
db.post.insertMany([
	{
	'title': 'MongoDB Overview',
	'description': 'An introduction to MongoDB / document database',
	'owner': 'lionking',
	'url': 'http://mdslab.unime.it/sites/default/files/mongodb_tutorial.pdf',
	'tags': ['mongodb','database','NoSQL'],
	'likes': 250
	},
	{
	'title': 'MongoDB 101',
	'description': 'An introduction to MongoDB / document database via compass',
	'owner': 'lionking',
	'url': 'http://mdslab.unime.it/sites/default/files/mongodb_compass.pdf',
	'tags': ['mongodb','database','NoSQL', 'compass'],
	'likes': 500,
	'comments':[	     
		{
			'user': 'fiola',
			'message': 'thanks! lionking',
			'dateCreated': new Date(2020,7,26,1,30),
			'likes': 0
        }
    ]
}])
```

#### Query document
---
```json
## Equality
db.post.find()
db.post.find({owner:"lionking"})
## การเขียนเงื่อนไข AND , condition ต้อง , กัน
db.post.find({likes:{$gte:50},owner:"Hikaru"})
## การเขียนเงื่อนไช OR , condition ต้องอยู่ใน :[]
db.post.find({$or:[{likes:{$gte:50}},{owner:"hikaru"}]})

db.post.find({likes:{$gte:50}})

## $ เป็น พวก operation
## การใช้งาน EX.
db.post.find({likes:{$gte:50},owner:"Hikaru"})
## แปลว่าให้หา likes ที่ >= 50
## $lt -> less than
## $lte -> less than or equal
## $gt -> greater than
## $gte -> greater than or equal
## $ne -> not equal

## แล้ว between ทำไง ?
db.post.find({likes:{$gte:80} , likes:{$lt:250}})

## การใช้ LIKE เหมือนใน sql
db.post.find({title: {$regex:'World'}})
## $regex -> ทุกคำที่มี ... เป็นส่วนประกอบ (case sensitive)
## $text
## $in
## $type
## $where
```

#### Update document
---
```json
db.users.insertMany([
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "New York" },
    { name: "Charlie", age: 35, city: "Los Angeles" }
])
db.users.updateOne(
    { city: "New York" }, 
    { $set: { age: 40 } }
)
// if use updateOne and
// if many qualified it will only update first one
db.users.updateMany( 
	{ city: "New York" }, 
	{ $set: { age: 40 } } 
)
```

#### Delete document
---
```json
db.post.deleteOne({title:"MongoDB Overview"})
db.post.deleteMany({title:"MongoDB Overview"})
```

#### Projection
---
- เอาแค่บาง field มาแสดง
```json
db.COLLECTION_NAME.find({condition...} , {KEY:1})
// ข้างหลังเป็น ON / OFF ของแต่ละ field
```
- เลือกแค่ field title และ tags มาแสดง โดยเอาเฉพาะ document ที่มี tags ใดก็ได้ตามที่ระบุใน $in
```json
db.post.find({tags:{$in:["compass","database"]}} , {title:1,_id:0,tags:1})
// "Find posts where the `tags` field contains at least one of `"compass"` or `"database"`."
```

#### Limit / Skip
---
- เหมือน postgresql
```json
db.post.find().limit(3)
db.post.find().limit(3).skip(2)
```

#### Sort
---
- 0 -> deactivate
- 1 -> น้อยไปมาก
- -1 -> มากไปน้อย
```json
db.post.find({},{title:1,likes:1,_id:0}).sort({likes:-1})
```

#### Indexing
---
- db.COLLECTION_NAME.ensureIndex({KEY:1})
```json
db.post.ensureIndex({title:1})
```

#### Aggregation
---
```json
db.post.aggregate([{$group: {_id:"$owner",num_content: {$sum: 1}}}])

db.post.aggregate
(
	[
	{$group: {_id:"$owner", total_likes: {$sum: "$likes"}}}, // first stage
	{$sort: {total_likes:1}} // second stage
	]
)
```
- aggregation ทำเป็นขั้นๆเรียก stage

#### $lookup
---
- ก็เป็น aggregate function
```json
db.post2.aggregate([
	{$lookup
		{
			from: "comment2",
			localField: "title",
			foreignField: "postTitle",
			as:"comments"
	    }
	}
])
```















