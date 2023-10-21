import json
import pandas as pd

# Define paths to the JSON and CSV files
json_file = 'restaurants_list.json'
csv_file = 'restaurants_info.csv'

# Define the shared key column name
shared_key_column = 'objectID' 

# Read JSON and CSV files
with open(json_file, 'r') as json_file:
    json_data = json.load(json_file)

csv_data = pd.read_csv(csv_file, delimiter=';')

# Convert JSON data to a DataFrame
json_df = pd.DataFrame(json_data)

# Merge JSON and CSV data based on the shared key "objectID"
merged_data = pd.merge(json_df, csv_data, on=shared_key_column)

# Round the "stars_count" attribute and add a new "stars_rounded" column
merged_data['stars_rounded'] = merged_data['stars_count'].round(0)

# Filter the "payment_options" attribute to exclude the unwanted values
filtered_payment_options = ['Visa', 'MasterCard', 'AMEX', 'Discover']
merged_data['filtered_payment_options'] = merged_data['payment_options'].apply(lambda options: [option for option in options if option in filtered_payment_options])

# Convert the merged data to JSON format
merged_json = merged_data.to_json(orient='records')

# Output the merged data as JSON file
output_json_file_path = 'merged_data.json'
with open(output_json_file_path, 'w') as output_json_file:
    output_json_file.write(merged_json)

print(f'Merged data saved to {output_json_file_path}')
