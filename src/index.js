import { scalePow } from 'd3-scale';
import * as turf from '@turf/turf';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const matchLists = (listA, listB) => {
    let matches = 0;
  
    if (listA.length > 0 && listB.length > 0) {
      matches = listA.filter((word) => { return listB.includes(word) }).length;
    }
  
    return matches;
};

export const rankVibes = (listA, listB) => {
    let rankings = [];
  
    rankings = listA.map((word) => {
      let score = 0;
  
      if (listB.includes(word)) {
        score = listB.length - listB.indexOf(word);
      }
  
      return score;
    });
  
    const average = rankings.reduce((a, b) => a + b, 0) / rankings.length;
  
    return average;
};

export const isOpen = (hours, time = dayjs()) => {
    const day = time.day();
    const date = time.format('YYYY-MM-DD');
    const hour = time.hour();
  
    if (!hours) return { openNow: false, openToday: false, isPopular: false };
  
    let dayFound = hours.find(({ day_of_week }) => day_of_week === day);
    const openEveryday = hours.find(({ day_of_week }) => day_of_week === 8);
  
    // If open everyday and no specific hours for current day
    if (openEveryday !== undefined && dayFound === undefined) dayFound = openEveryday;
  
    if (dayFound) {
  
      const opens = dayjs(date + ' ' + dayFound.opens);
      const closes = dayjs(date + ' ' + dayFound.closes);
  
      // Return if open and if it's a popular time
      const openNow = time.isBetween(opens, closes);
      const isPopular = (openNow && dayFound.name === 'POPULAR');
      const hoursToday = opens.format('ha') + ' - ' + closes.format('ha');
  
      return { openNow: openNow, openToday: true, opens: opens, closes: closes, isPopular: isPopular };
  
    } else {
      return { openNow: false, openToday: false, isPopular: false };
    }
};

export const normalize = (val, min, max) => {
    return (val - min) / (max - min) * 10;
};

export const scaleIconSize = (score, max) => {
    const scale = scalePow(1)
      .domain([0, max])
      .range([1, 2]);
  
    return scale(score);
};

export const getFeaturesInBounds = (features, bounds) => {

    const collection = turf.featureCollection(features)

    //const box = bbox(lineString(bounds))

    const polygon = turf.bboxPolygon(bounds.flat());

    const pointsInBounds = turf.pointsWithinPolygon(collection, polygon)

    // TODO: Will it be faster to keep features in a collection and use the turf each method? 
    return pointsInBounds.features;

}


export const scorePlaces = async (places, centerPoint, vibes, scoreBy, sortByDistance) => {
    scoreBy = scoreBy || ['vibes', 'distance'];
  
    // Default max values; These will get set by the max in each field
    const maxScores = {};
    scoreBy.map((field) => { maxScores[field] = 1; });
  
    const vibeMatchBonus = 10;
    const vibeRankBonus = 5;
    const offerBonus = 5;
    const openBonus = 2.5;
    const popularBonus = 5;
  
    // Weight distance & rating different than other fields
    const weights = { vibe: 1.0, distance: 0.6, rating: 0.6, hours: 0.6, offers: 0.6 };
  
  
    if (vibes.length > 0) weights.vibe = 3;
    // TODO: Handle sorting and rankig for other cases
  
    // Get scores and max in each category
    const placesScored = await places.map((place) => {
  
      const fields = place.properties;
  
      if (scoreBy.includes('vibes')) {
        // Give place a vibe score
        let [vibeMatches, averageRank, vibeBonus] = [0, 0, 0];
  
        fields.vibes_score = 0;
        // TODO: TEMP until events return vibes
        if (fields.vibes === undefined) fields.vibes = ['chill'];
        if (fields.vibes.length > 0) fields.vibes_score = fields.vibes.length;
  
        // TODO: Don't show markers without photos; this will analyze the vibe and quality of the image
        if (fields.images && fields.images.length > 0) vibeBonus += vibeMatchBonus;
  
        // Give direct vibe matches bonus points
        if (vibes.length > 0 && fields.vibes) {
          vibeMatches = matchLists(vibes, fields.vibes);
          averageRank = rankVibes(vibes, fields.vibes);
  
          vibeBonus = vibeMatches * vibeMatchBonus + averageRank * vibeRankBonus;
  
          fields.vibes_score += vibeBonus;
        }
  
        // Set max vibe score
        if (fields.vibes_score > maxScores.vibes) {
          maxScores.vibes = fields.vibes_score;
        }
      }
  
      if (scoreBy.includes('likes')) {
        // Set max aggregate score
        if (fields.likes > maxScores.likes) {
          maxScores.likes = fields.likes;
        }
      }
  
      if (scoreBy.includes('distance')) {
        const point = turf.point(place.geometry.coordinates);
        fields.distance = turf.distance(centerPoint, point, { units: 'miles' });
        // Set max distance
        if (fields.distance > maxScores.distance) {
          maxScores.distance = fields.distance;
        }
      }
  
      if (scoreBy.includes('aggregate_rating')) {
        // Set max aggregate score
        if (fields.aggregate_rating > maxScores.aggregate_rating) {
          maxScores.aggregate_rating = fields.aggregate_rating;
        }
      }
  
      /* TODO: WIP concept for popular times and hours */
      //console.log('Score place on these fields: ', fields.offers, fields.opening_hours)
      fields.offers_score = 0;
      fields.hours_score = 0;
  
      if (scoreBy.includes('offers')) {
        if (fields.offers && fields.offers.length > 0) {
  
          fields.offers_score = offerBonus;
  
          // const currentTime = dayjs();
          /* TODO: Add or subract and hour from popular times and compare */
          // console.log('score with currentTime (day, hour): ', currentTime.day(), currentTime.hour())
        }
  
  
        const { openNow, openToday, opens, closes, isPopular } = isOpen(fields.opening_hours);
  
        // Store in place details
        fields.open_now = openNow;
        fields.popular_now = isPopular;
        fields.opens = opens;
        fields.closes = closes;
  
        // Give bonus if open now
        if (openToday) fields.hours_score += openBonus;
        if (openNow) fields.hours_score += openBonus;
        if (isPopular) fields.hours_score += popularBonus;
  
      }
  
      place.properties = fields;
      return place;
    });
  
    let maxAverageScore = 0;
  
    // Normalize each place by the top scores across all results
    const placesScoredAveraged = placesScored.map((place) => {
      const fields = place.properties;
  
      if (scoreBy.includes('vibes')) {
        fields.vibes_score = normalize(fields.vibes_score, 0, maxScores.vibes);
        fields.vibes_score *= weights.vibe;
  
      }
  
      if (scoreBy.includes('likes')) {
        fields.likes_score = normalize(fields.likes, 0, maxScores.likes);
      }
  
      if (scoreBy.includes('aggregate_rating')) {
        fields.aggregate_rating_score = normalize(fields.aggregate_rating, 2, maxScores.aggregate_rating);
        fields.aggregate_rating_score *= weights.rating;
      }
  
      // Distance is inverted from max and then normalize 1-10
      if (scoreBy.includes('distance')) {
        const maxDistance = maxScores.distance;
        fields.distance_score = normalize(maxDistance - fields.distance, 0, maxDistance);
  
        fields.distance_score *= weights.distance;
      }
  
      if (scoreBy.includes('hours')) {
        fields.hours_score *= weights.hours;
      }
  
      const reasons = scoreBy;
  
      const scores = scoreBy.map((field) => fields[field + '_score']);
  
      const largestIndex = scores.indexOf(Math.max.apply(null, scores));
  
      fields.average_score = scores.reduce((a, b) => a + b, 0) / scores.length;
  
      if (fields.average_score > maxAverageScore) maxAverageScore = fields.average_score;
  
  
      // Add a reason code
      fields.reason = reasons[largestIndex];
  
      // Normalize the icon size to match photo markers.
      fields.icon_size = scaleIconSize(fields.average_score, 10);
  
      place.properties = fields;
      return place;
    });
  
    // Re-sort by average score
    const placesScoredAndSorted = placesScoredAveraged.sort((a, b) => sortByDistance ? b.properties.distance_score - a.properties.distance_score : b.properties.average_score - a.properties.average_score);
  
    // Normalize & scale icon
    const placesSortedAndNormalized = placesScoredAndSorted.map((place) => {
      const fields = place.properties;
  
      // Normalize the scores between 1 & 5
      fields.average_score = normalize(fields.average_score, 0, maxAverageScore) / 2;
  
      // Scale the icon size based on score
      fields.icon_size = scaleIconSize(fields.average_score, 10);
  
      return place;
    });
  
    // placesScoredAndSorted.map((place) => {
    //   console.log(place.properties.name);
    //   console.log(' - vibes_score: ', place.properties.vibes_score);
    //   console.log(' - aggregate rating: ', place.properties.aggregate_rating_score);
    //   console.log(' - distance: ', place.properties.distance_score);
    //   console.log(' - reason: ', place.properties.reason);
    //   console.log(' - average_score: ', place.properties.average_score);
    // });
  
    return placesSortedAndNormalized;
  
  };