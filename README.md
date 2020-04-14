# README

# 開発環境
- Rails 5.0.7.2
- DB mysql

***

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messeages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many : groups_users
- has_many : users, through: :groups_users 
- has_many : messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group