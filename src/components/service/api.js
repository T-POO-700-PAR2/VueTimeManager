// fake data ----------------------------

export const getAllDataMeteo = () => {
    return {
  "cities": [
    {
      "city": "Paris",
      "temperature": 18,
      "humidity": 72,
      "wind_speed": 15,
      "condition": "Cloudy",
      "forecast": [
        { "day": "Monday", "temperature": 19, "condition": "Partly Cloudy" },
        { "day": "Tuesday", "temperature": 21, "condition": "Sunny" },
        { "day": "Wednesday", "temperature": 17, "condition": "Rainy" }
      ]
    },
    {
      "city": "Lyon",
      "temperature": 22,
      "humidity": 65,
      "wind_speed": 10,
      "condition": "Sunny",
      "forecast": [
        { "day": "Monday", "temperature": 23, "condition": "Sunny" },
        { "day": "Tuesday", "temperature": 24, "condition": "Sunny" },
        { "day": "Wednesday", "temperature": 20, "condition": "Partly Cloudy" }
      ]
    },
    {
      "city": "Marseille",
      "temperature": 24,
      "humidity": 60,
      "wind_speed": 18,
      "condition": "Sunny",
      "forecast": [
        { "day": "Monday", "temperature": 25, "condition": "Sunny" },
        { "day": "Tuesday", "temperature": 26, "condition": "Sunny" },
        { "day": "Wednesday", "temperature": 22, "condition": "Cloudy" }
      ]
    },
    {
      "city": "Bordeaux",
      "temperature": 20,
      "humidity": 68,
      "wind_speed": 12,
      "condition": "Rainy",
      "forecast": [
        { "day": "Monday", "temperature": 21, "condition": "Partly Cloudy" },
        { "day": "Tuesday", "temperature": 22, "condition": "Rainy" },
        { "day": "Wednesday", "temperature": 18, "condition": "Rainy" }
      ]
        },
    {
      "city": "Gotham City",
      "temperature": 17,
      "humidity": 68,
      "wind_speed": 16,
      "condition": "Rainy",
      "forecast": [
        { "day": "Monday", "temperature": 20, "condition": "Partly Cloudy" },
        { "day": "Tuesday", "temperature": 22, "condition": "Rainy" },
        { "day": "Wednesday", "temperature": 18, "condition": "Rainy" }
      ]
    },
    {
      "city": "Nice",
      "temperature": 23,
      "humidity": 58,
      "wind_speed": 14,
      "condition": "Partly Cloudy",
      "forecast": [
        { "day": "Monday", "temperature": 24, "condition": "Sunny" },
        { "day": "Tuesday", "temperature": 25, "condition": "Partly Cloudy" },
        { "day": "Wednesday", "temperature": 21, "condition": "Cloudy" }
      ]
    }
  ]
}
}

export const getNameContry = () => {
    return ["Lyon", "Paris","Bordeaux","Marseille"]
}