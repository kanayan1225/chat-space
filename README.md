# README

# 開発環境
- Rails 5.0.7.2
- DB mysql

***

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messeages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many : groups_users
- has_many : users, through: :groups_users 
- has_many : messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belong_to :user
- belong_to :group