// =============================================================================
// COURSE DATA - AI/ML Learning Hub
// Comprehensive curriculum designed by expert educators
// =============================================================================

import { Course } from '../types';

// =============================================================================
// PYTHON PROGRAMMING MASTERCLASS
// =============================================================================

export const pythonMasterclass: Course = {
  id: 'python-masterclass',
  title: 'Python Programming Masterclass',
  description: 'Complete Python programming course from fundamentals to advanced concepts. Learn data structures, OOP, file handling, and build real-world applications.',
  level: 'beginner',
  category: 'Python',
  duration: 48,
  instructor: 'Dr. Sarah Chen',
  rating: 4.9,
  enrollmentCount: 125680,
  icon: '🐍',
  skills: ['Python Syntax', 'Data Structures', 'OOP', 'File Handling', 'Error Handling', 'APIs'],
  prerequisites: ['No prior programming experience required', 'Basic computer skills'],
  outcomes: [
    'Write clean, efficient Python code from scratch',
    'Master object-oriented programming principles',
    'Work with files, APIs, and external data sources',
    'Build command-line applications and scripts',
  ],
  modules: [
    {
      id: 'py-mod-1',
      title: 'Module 1: Python Fundamentals',
      description: 'Getting started with Python: installation, variables, and data types',
      lessons: [
        {
          id: 'py-1-1',
          title: 'Introduction to Python & Environment Setup',
          duration: 20,
          type: 'video',
          content: `# Introduction to Python Programming

Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It has become one of the most popular programming languages worldwide due to its elegant syntax and versatility.

## Why Python Dominates Modern Development

**1. Readable and Expressive Syntax**
Python code reads almost like English, significantly reducing the learning curve. A simple "Hello World" is just: print("Hello, World!")

**2. Versatile Application Domains**
Python excels across multiple domains:
- Web Development (Django, Flask, FastAPI)
- Data Science (Pandas, NumPy, Polars)
- Machine Learning (TensorFlow, PyTorch, scikit-learn)
- Automation and Scripting
- Scientific Computing

**3. Industry Adoption**
Major companies using Python: Google, Netflix, NASA, Instagram, Spotify. Average Python developer salary exceeds $120,000 annually in the US.

**4. Rich Ecosystem**
The Python Package Index (PyPI) hosts over 400,000 packages for virtually any programming task.`,
          keyPoints: [
            'Python is interpreted, not compiled - code runs line by line',
            'Python 3.x is the current standard',
            'Indentation defines code blocks - use 4 spaces consistently',
            'Virtual environments isolate project dependencies',
          ],
        },
        {
          id: 'py-1-2',
          title: 'Variables and Data Types',
          duration: 25,
          type: 'article',
          content: `# Variables and Data Types in Python

## Understanding Variables

Variables in Python are references to objects stored in memory. Python uses dynamic typing - you don't need to declare types explicitly.

## Primitive Data Types

**1. Numeric Types**
- int: Whole numbers (42, -17, 999999999999999)
- float: Decimal numbers (3.14159, -0.001, 2.0)
- complex: Numbers with real and imaginary parts (3+4j)

**2. Boolean Type**
- Represents truth values: True or False
- Results from comparison operations

**3. String Type**
- Immutable sequences of Unicode characters
- Multiple creation methods: single quotes, double quotes, triple quotes

**4. None Type**
- Represents the absence of a value
- Similar to null in other languages`,
          codeExample: `# Variables and Data Types Demo

# Numeric types
age = 25                    # int
temperature = 98.6          # float
complex_num = 3 + 4j        # complex

# String types
name = "Alice"              # str
message = '''Hello,
This is a multi-line string!'''

# Boolean
is_student = True
has_graduated = False

# None type
result = None

# Type checking
print(f"age is {type(age).__name__}")
print(f"temperature is {type(temperature).__name__}")
print(f"name is {type(name).__name__}")

# Type conversion
number_string = "42"
converted_int = int(number_string)
converted_float = float(number_string)
print(f"String '{number_string}' -> Int: {converted_int}, Float: {converted_float}")`,
          codeLanguage: 'python',
        },
        {
          id: 'py-1-3',
          title: 'String Operations & Formatting',
          duration: 30,
          type: 'article',
          content: `# String Operations and Formatting

Strings are one of the most commonly used data types in Python. Understanding string manipulation is essential for text processing and data cleaning.

## String Methods

Python strings come with over 40 built-in methods:

**Case Manipulation:**
- upper(), lower(), title(), capitalize()

**Searching:**
- find(), index(), count(), startswith(), endswith()

**Modification:**
- replace(), strip(), split(), join()

## String Formatting

f-strings (Python 3.6+) are the modern standard:
- Fast, readable, and expressive
- Support expressions inside braces`,
          codeExample: `# String Operations Demo

text = "  Python Programming  "
print(f"Original: '{text}'")
print(f"Stripped: '{text.strip()}'")
print(f"Lower: '{text.lower()}'")
print(f"Title: '{text.title()}'")

# Splitting and joining
sentence = "apple,banana,cherry,date"
fruits = sentence.split(",")
print(f"Split: {fruits}")
joined = " | ".join(fruits)
print(f"Joined: {joined}")

# f-string formatting
name = "Alice"
age = 28
score = 95.6789

print(f"Name: {name}, Age: {age}")
print(f"Score: {score:.2f}")  # 2 decimal places

# Conditional expressions in f-strings
status = "adult" if age >= 18 else "minor"
print(f"{name} is an {status}")`,
          codeLanguage: 'python',
        },
        {
          id: 'py-1-4',
          title: 'Numeric Operations & Math',
          duration: 25,
          type: 'article',
          content: `# Numeric Operations and Mathematical Functions

Python provides comprehensive support for numerical operations, from basic arithmetic to advanced mathematical functions.

## Arithmetic Operators

- Addition (+), Subtraction (-), Multiplication (*)
- Division (/), Floor Division (//), Modulo (%)
- Exponentiation (**)

## The math Module

For advanced operations, import the math module:
- Constants: math.pi, math.e
- Functions: sqrt(), log(), sin(), cos(), exp()`,
          codeExample: `# Numeric Operations Demo
import math

# Basic arithmetic
a, b = 17, 5
print(f"Addition: {a} + {b} = {a + b}")
print(f"Division: {a} / {b} = {a / b}")
print(f"Floor Division: {a} // {b} = {a // b}")
print(f"Modulo: {a} % {b} = {a % b}")
print(f"Power: {a} ** {b} = {a ** b}")

# Math functions
print(f"Pi: {math.pi}")
print(f"Square root of 16: {math.sqrt(16)}")
print(f"Factorial of 5: {math.factorial(5)}")

# Rounding
value = 3.14159
print(f"Round to 2 decimals: {round(value, 2)}")`,
          codeLanguage: 'python',
        },
      ],
    },
    {
      id: 'py-mod-2',
      title: 'Module 2: Control Flow & Logic',
      description: 'Master conditional statements and loops',
      lessons: [
        {
          id: 'py-2-1',
          title: 'Conditional Statements',
          duration: 30,
          type: 'article',
          content: `# Conditional Statements in Python

Conditional statements allow your programs to make decisions based on conditions.

## Comparison Operators

- Equal: ==
- Not equal: !=
- Greater than: >, Less than: <
- Greater or equal: >=, Less or equal: <=

## Logical Operators

- and: True if both conditions are true
- or: True if at least one condition is true
- not: Inverts the boolean value`,
          codeExample: `# Conditional Statements Demo

# Basic if-else
age = 20
if age >= 18:
    status = "adult"
    print(f"You are an {status}")
else:
    print("You are a minor")

# Multiple conditions
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Score {score} = Grade {grade}")

# Ternary operator
num = 7
result = "even" if num % 2 == 0 else "odd"
print(f"{num} is {result}")`,
          codeLanguage: 'python',
        },
        {
          id: 'py-2-2',
          title: 'Loops: for and while',
          duration: 35,
          type: 'article',
          content: `# Loops in Python

Loops allow you to execute code repeatedly.

## For Loops

The for loop iterates over any iterable object (lists, strings, ranges).

## While Loops

While loops continue as long as a condition remains true.

## Loop Control

- break: Exit the loop entirely
- continue: Skip to the next iteration`,
          codeExample: `# Loops Demo

# Basic for loop
print("Counting 0-4:")
for i in range(5):
    print(f"  {i}")

# Iterating over list
fruits = ["apple", "banana", "cherry"]
print("\\nFruits:")
for fruit in fruits:
    print(f"  - {fruit}")

# Enumerate for index
print("\\nIndexed fruits:")
for index, fruit in enumerate(fruits):
    print(f"  {index}: {fruit}")

# While loop
print("\\nCountdown:")
count = 5
while count > 0:
    print(f"  {count}...")
    count -= 1
print("  Blast off!")`,
          codeLanguage: 'python',
        },
      ],
    },
    {
      id: 'py-mod-3',
      title: 'Module 3: Data Structures',
      description: 'Master Python collections: lists, dictionaries, tuples, and sets',
      lessons: [
        {
          id: 'py-3-1',
          title: 'Lists: Creation and Methods',
          duration: 35,
          type: 'article',
          content: `# Lists in Python

Lists are ordered, mutable collections that can hold items of any type.

## Creating Lists

- Using square brackets: [1, 2, 3]
- Using list(): list(range(5))
- List comprehensions: [x**2 for x in range(5)]

## List Methods

- Adding: append(), insert(), extend()
- Removing: remove(), pop(), clear()
- Searching: index(), count()
- Sorting: sort(), reverse()`,
          codeExample: `# Lists Demo

# Creating and modifying
fruits = ["apple", "banana", "cherry"]
print(f"Original: {fruits}")

fruits.append("date")
print(f"After append: {fruits}")

fruits.insert(1, "blueberry")
print(f"After insert: {fruits}")

# Slicing
numbers = [0, 1, 2, 3, 4, 5]
print(f"\\nFull list: {numbers}")
print(f"First 3: {numbers[:3]}")
print(f"Last 3: {numbers[-3:]}")
print(f"Every 2nd: {numbers[::2]}")

# List comprehension
squares = [x**2 for x in range(10)]
print(f"\\nSquares: {squares}")

evens = [x for x in range(20) if x % 2 == 0]
print(f"Evens: {evens}")`,
          codeLanguage: 'python',
        },
        {
          id: 'py-3-2',
          title: 'Dictionaries',
          duration: 35,
          type: 'article',
          content: `# Dictionaries in Python

Dictionaries are unordered collections of key-value pairs. They're optimized for fast lookups.

## Creating Dictionaries

- Curly braces: {"key": "value"}
- dict() constructor: dict(key="value")
- Dictionary comprehensions

## Dictionary Methods

- keys(), values(), items()
- get(), setdefault()
- update(), pop()`,
          codeExample: `# Dictionaries Demo

person = {
    "name": "Alice",
    "age": 30,
    "city": "New York",
    "skills": ["Python", "JavaScript"]
}

print("Person dictionary:")
for key, value in person.items():
    print(f"  {key}: {value}")

# Accessing values
print(f"\\nName: {person['name']}")
print(f"City: {person.get('city')}")
print(f"Country (default): {person.get('country', 'Unknown')}")

# Modifying
person["email"] = "alice@example.com"
person["age"] = 31
print(f"\\nAfter modifications:")
print(f"  Age: {person['age']}")
print(f"  Email: {person['email']}")

# Dictionary comprehension
squares = {x: x**2 for x in range(1, 6)}
print(f"\\nSquares dict: {squares}")`,
          codeLanguage: 'python',
        },
      ],
    },
    {
      id: 'py-mod-4',
      title: 'Module 4: Functions & OOP',
      description: 'Create reusable code with functions and master OOP',
      lessons: [
        {
          id: 'py-4-1',
          title: 'Functions and Parameters',
          duration: 40,
          type: 'article',
          content: `# Functions in Python

Functions are reusable blocks of code that perform specific tasks.

## Parameter Types

- Positional arguments: Passed in order
- Keyword arguments: Passed by name
- Default parameters: Have fallback values
- *args: Capture arbitrary positional arguments
- **kwargs: Capture arbitrary keyword arguments

## Return Values

- Single value: return value
- Multiple values: return a, b, c (returns tuple)`,
          codeExample: `# Functions Demo

# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))

# Default parameters
def power(base, exponent=2):
    return base ** exponent

print(f"power(3) = {power(3)}")
print(f"power(3, 3) = {power(3, 3)}")

# Multiple returns
def min_max_avg(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

minimum, maximum, average = min_max_avg([1, 2, 3, 4, 5])
print(f"Min: {minimum}, Max: {maximum}, Avg: {average}")

# *args
def sum_all(*numbers):
    return sum(numbers)

print(f"sum_all(1,2,3,4,5) = {sum_all(1, 2, 3, 4, 5)}")

# Lambda
square = lambda x: x ** 2
print(f"Lambda square(5) = {square(5)}")`,
          codeLanguage: 'python',
        },
        {
          id: 'py-4-2',
          title: 'Object-Oriented Programming',
          duration: 45,
          type: 'article',
          content: `# Object-Oriented Programming in Python

OOP is a programming paradigm based on objects containing data and code.

## Core Concepts

**1. Classes and Objects**
- A class is a blueprint for creating objects
- An object is an instance of a class

**2. The Four Pillars**
- Encapsulation: Bundling data and methods
- Abstraction: Hiding implementation details
- Inheritance: Creating new classes from existing ones
- Polymorphism: Same interface, different implementations`,
          codeExample: `# OOP Demo

class Dog:
    # Class attribute
    species = "Canis familiaris"
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        return f"{self.name} says Woof!"
    
    def __str__(self):
        return f"Dog({self.name}, {self.age} years)"

# Create instances
buddy = Dog("Buddy", 3)
print(buddy.bark())
print(f"Species: {Dog.species}")

# Inheritance
class GoldenRetriever(Dog):
    def __init__(self, name, age, favorite_toy):
        super().__init__(name, age)
        self.favorite_toy = favorite_toy
    
    def fetch(self):
        return f"{self.name} fetches the {self.favorite_toy}!"

charlie = GoldenRetriever("Charlie", 2, "tennis ball")
print(charlie.fetch())

# Encapsulation with property
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance
    
    @property
    def balance(self):
        return self._balance
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

account = BankAccount("Alice", 1000)
account.deposit(500)
print(f"Balance: {account.balance}")`,
          codeLanguage: 'python',
        },
      ],
    },
  ],
};

// =============================================================================
// MACHINE LEARNING FUNDAMENTALS
// =============================================================================

export const mlFundamentals: Course = {
  id: 'ml-fundamentals',
  title: 'Machine Learning Fundamentals',
  description: 'Comprehensive introduction to machine learning algorithms, from supervised learning to model evaluation.',
  level: 'intermediate',
  category: 'Machine Learning',
  duration: 36,
  instructor: 'Dr. Michael Torres',
  rating: 4.8,
  enrollmentCount: 89450,
  icon: '🤖',
  skills: ['Scikit-learn', 'Model Training', 'Feature Engineering', 'Model Evaluation'],
  prerequisites: ['Python Programming', 'Basic Statistics'],
  outcomes: [
    'Understand core ML algorithms',
    'Build and evaluate classification and regression models',
    'Perform feature engineering and data preprocessing',
    'Implement cross-validation and hyperparameter tuning',
  ],
  modules: [
    {
      id: 'ml-mod-1',
      title: 'Module 1: ML Foundations',
      description: 'Understanding machine learning concepts and workflows',
      lessons: [
        {
          id: 'ml-1-1',
          title: 'What is Machine Learning?',
          duration: 25,
          type: 'video',
          content: `# What is Machine Learning?

Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn from data without explicit programming.

## Types of Machine Learning

### 1. Supervised Learning

Learning from labeled data:
- Classification: Predicting categories (spam/not spam)
- Regression: Predicting continuous values (house prices)

### 2. Unsupervised Learning

Finding patterns in unlabeled data:
- Clustering: Grouping similar items
- Dimensionality Reduction: Simplifying data

### 3. Reinforcement Learning

Learning through trial and error with rewards:
- Game playing (AlphaGo)
- Robotics`,
          codeExample: `# ML Types Overview
from sklearn.datasets import make_classification, make_blobs

# Supervised - Classification
X_clf, y_clf = make_classification(n_samples=100, n_features=2, 
                                   n_redundant=0, random_state=42)
print("Classification Data:")
print(f"  Features shape: {X_clf.shape}")
print(f"  Classes: {set(y_clf)}")

# Unsupervised - Clustering
X_cluster, _ = make_blobs(n_samples=100, centers=3, random_state=42)
print(f"Clustering Data shape: {X_cluster.shape}")

print("\\n=== ML Workflow ===")
print("1. Data Collection")
print("2. Data Preprocessing")
print("3. Feature Engineering")
print("4. Model Training")
print("5. Model Evaluation")
print("6. Hyperparameter Tuning")
print("7. Deployment")`,
          codeLanguage: 'python',
        },
        {
          id: 'ml-1-2',
          title: 'Data Preprocessing',
          duration: 35,
          type: 'article',
          content: `# Data Preprocessing

Data preprocessing transforms raw data into a clean, suitable format for ML algorithms.

## Common Steps

1. **Handling Missing Values**
   - Deletion: Remove rows/columns
   - Imputation: Fill with mean, median, or predicted values

2. **Feature Scaling**
   - Standardization: Zero mean, unit variance
   - Normalization: Scale to [0, 1] range

3. **Encoding Categorical Variables**
   - Label Encoding: Categories to numbers
   - One-Hot Encoding: Binary columns per category`,
          codeExample: `# Data Preprocessing Demo
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer

# Sample data with missing values
data = {
    'age': [25, 30, np.nan, 35, 40],
    'income': [50000, 60000, 55000, np.nan, 80000],
    'education': ['Bachelor', 'Master', 'Bachelor', 'PhD', 'Master']
}
df = pd.DataFrame(data)
print("Original Data:")
print(df)

# Handle missing values
imputer = SimpleImputer(strategy='mean')
df[['age', 'income']] = imputer.fit_transform(df[['age', 'income']])
print("\\nAfter imputation:")
print(df[['age', 'income']])

# Feature scaling
scaler = StandardScaler()
df['age_scaled'] = scaler.fit_transform(df[['age']])
print(f"\\nAge scaled (mean~0, std~1)")

# Label encoding
le = LabelEncoder()
df['education_encoded'] = le.fit_transform(df['education'])
print(f"\\nEducation encoded: {dict(zip(le.classes_, range(len(le.classes_))))}")`,
          codeLanguage: 'python',
        },
      ],
    },
    {
      id: 'ml-mod-2',
      title: 'Module 2: Supervised Learning',
      description: 'Classification and regression algorithms',
      lessons: [
        {
          id: 'ml-2-1',
          title: 'Linear Regression',
          duration: 40,
          type: 'article',
          content: `# Linear Regression

Linear regression models the relationship between variables by fitting a linear equation.

## The Model

y = β₀ + β₁x + ε

Where:
- y is the predicted value
- β₀ is the intercept
- β₁ is the slope (coefficient)
- ε is the error term

## Evaluation Metrics

- R² Score: Proportion of variance explained
- MSE: Mean Squared Error
- RMSE: Root Mean Squared Error`,
          codeExample: `# Linear Regression Demo
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error
import numpy as np

# Generate data
np.random.seed(42)
sqft = np.random.uniform(800, 3000, 100)
price = 100 * sqft + np.random.normal(0, 20000, 100)

# Train model
X = sqft.reshape(-1, 1)
y = price
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LinearRegression()
model.fit(X_train, y_train)

print(f"Coefficient: {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")

# Predictions
y_pred = model.predict(X_test)
print(f"\\nR² Score: {r2_score(y_test, y_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.2f}")

# Predict new house
new_house = [[2000]]
predicted = model.predict(new_house)
print(f"\\n2000 sqft house: {predicted[0]:,.0f}")`,
          codeLanguage: 'python',
        },
        {
          id: 'ml-2-2',
          title: 'Classification',
          duration: 40,
          type: 'article',
          content: `# Classification

Classification predicts discrete categories. Logistic Regression is a fundamental classification algorithm.

## Evaluation Metrics

- Accuracy: Correct predictions / Total
- Precision: TP / (TP + FP)
- Recall: TP / (TP + FN)
- F1 Score: Harmonic mean of precision and recall`,
          codeExample: `# Classification Demo
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.datasets import load_iris

# Load data
iris = load_iris()
X, y = iris.data, iris.target

# Split and train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

print(f"Accuracy: {accuracy_score(y_test, y_pred):.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))`,
          codeLanguage: 'python',
        },
      ],
    },
  ],
};

// =============================================================================
// DEEP LEARNING
// =============================================================================

export const deepLearningCourse: Course = {
  id: 'deep-learning',
  title: 'Deep Learning with TensorFlow',
  description: 'Master neural networks, CNNs, and modern deep learning techniques.',
  level: 'advanced',
  category: 'Deep Learning',
  duration: 44,
  instructor: 'Dr. Emily Watson',
  rating: 4.9,
  enrollmentCount: 67230,
  icon: '🧠',
  skills: ['TensorFlow', 'Keras', 'Neural Networks', 'CNNs'],
  prerequisites: ['Python', 'Machine Learning Basics'],
  outcomes: [
    'Build and train neural networks from scratch',
    'Implement CNNs for computer vision',
    'Apply transfer learning',
  ],
  modules: [
    {
      id: 'dl-mod-1',
      title: 'Module 1: Neural Network Foundations',
      description: 'Understanding neurons, activation functions, and backpropagation',
      lessons: [
        {
          id: 'dl-1-1',
          title: 'Introduction to Neural Networks',
          duration: 35,
          type: 'video',
          content: `# Introduction to Neural Networks

Neural networks are computing systems inspired by the human brain, consisting of interconnected nodes (neurons).

## The Perceptron

A single neuron: y = f(w·x + b)

Where:
- x = input features
- w = weights
- b = bias
- f = activation function

## Activation Functions

- ReLU: max(0, x) - most common
- Sigmoid: 1/(1+e^-x) - for binary classification
- Softmax: for multi-class classification`,
          codeExample: `# Neural Network with Keras
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

# Generate data
X = np.random.randn(1000, 20)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

# Build model
model = keras.Sequential([
    layers.Input(shape=(20,)),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(X, y, epochs=10, batch_size=32, verbose=0)

print(f"Final accuracy: {history.history['accuracy'][-1]:.3f}")
print(f"\\nModel summary:")
model.summary()`,
          codeLanguage: 'python',
        },
      ],
    },
  ],
};

// =============================================================================
// EXPORT ALL
// =============================================================================

export const allCourses: Course[] = [
  pythonMasterclass,
  mlFundamentals,
  deepLearningCourse,
];

export const getCourseById = (id: string): Course | undefined => {
  return allCourses.find(course => course.id === id);
};

export const getCourseCount = (): number => allCourses.length;

export const getTotalLessons = (): number => 
  allCourses.reduce((acc, course) => 
    acc + course.modules.reduce((sum, module) => sum + module.lessons.length, 0), 0
  );

export const getTotalDuration = (): number => 
  allCourses.reduce((acc, course) => acc + course.duration, 0);
